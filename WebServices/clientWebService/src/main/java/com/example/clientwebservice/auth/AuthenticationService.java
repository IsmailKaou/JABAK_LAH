package com.example.clientwebservice.auth;

import com.example.clientwebservice.config.JwtService;
import com.example.clientwebservice.model.Agent;
import com.example.clientwebservice.repository.AgentRepository;
import com.example.clientwebservice.model.AgentToken;
import com.example.clientwebservice.repository.AgentTokenRepository;
import com.example.clientwebservice.model.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AgentRepository agentCrud;
    private final AgentTokenRepository agentTokenRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AgentAuthenticationResponse authenticateAgent(AgentAuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var agent = agentCrud.findAgentByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(agent);
        var refreshToken = jwtService.generateRefreshToken(agent);
        revokeAllAgentTokens(agent);
        saveAgentToken(agent,jwtToken);
        return AgentAuthenticationResponse.builder()
            .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .id(agent.getId())
                .firstName(agent.getFirstName())
                .lastName(agent.getLastName())
                .email(agent.getEmail())
                .role(agent.getRole().name())
                .isTokenValid(agentTokenRepository.findByToken(jwtToken).map(t->(!t.isRevoked() && !t.isExpired())).orElse(false))
                .build();
    }

    private void revokeAllAgentTokens(Agent agent)
    {
        var validAgentTokens = agentTokenRepository.findAllValidTokensByAgent(agent.getId());
        if(validAgentTokens.isEmpty())
        {
            return;
        }
        validAgentTokens.forEach(t->{
            t.setRevoked(true);
            t.setExpired(true);
        });
        agentTokenRepository.saveAll(validAgentTokens);
    }

    private void saveAgentToken(Agent agent, String jwtToken) {
        var token = AgentToken.builder()
                .agent(agent)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        agentTokenRepository.save(token);
    }

    public void refreshToken(
            HttpServletRequest request, HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader("Authorization");
        final String refreshToken;
        final String agentEmail;
        // the goal here is to check for the jwt token
        if(authHeader==null || !authHeader.startsWith("Bearer ")){
            return;
        }
        // contains "Bearer " including the space, extracting the JWT token
        refreshToken = authHeader.substring(7);

        // extracting the userEmail from the JWT token
        agentEmail = jwtService.extractUsername(refreshToken);
        // we have the agent Email but he is not authenticated
        if(agentEmail != null)
        {
            var userDetails = this.agentCrud.findAgentByEmail(agentEmail).orElseThrow();
            if(jwtService.isTokenValid(refreshToken,userDetails))
            {
                var accessToken=jwtService.generateToken(userDetails);
                revokeAllAgentTokens(userDetails);
                saveAgentToken(userDetails, accessToken);
                var authResponse = AgentAuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(),authResponse);
            }
        }


    }
}
