package com.example.clientwebservice.auth;

import com.example.clientwebservice.config.JwtService;
import com.example.clientwebservice.model.Agent;
import com.example.clientwebservice.repository.AgentRepository;
import com.example.clientwebservice.model.AgentToken;
import com.example.clientwebservice.repository.AgentTokenRepository;
import com.example.clientwebservice.model.TokenType;
import org.springframework.beans.factory.annotation.Value;
import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.model.Token;
import com.example.clientwebservice.repository.ClientRepository;
import com.example.clientwebservice.repository.TokenRepository;
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
    private final ClientRepository repository;
    private final AgentTokenRepository agentTokenRepository;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
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
                .status(agent.getRole())
                .expirationIn(jwtExpiration)
                .isTokenValid(true)
                .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getPhoneNumber(),request.getPassword()));
        var client=repository.findByPhoneNumber(request.getPhoneNumber()).orElseThrow();
        var jwtToken = jwtService.generateToken(client);
        var refreshToken = jwtService.generateRefreshToken(client);
        // ! we should revoke all the client tokens before storing the new one
        revokeAllClientTokens(client);
        // ! we store the clients token to work with it when we want to log out
        saveUserToken(client, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .id(client.getId())
                .firstName(client.getFirstName())
                .lastName(client.getLastName())
                .emailAddress(client.getEmailAddress())
                .ceiling(client.getCeiling())
                .phoneNumber(client.getPhoneNumber())
                .status(client.getRole().name())
                .expirationIn(jwtExpiration)
                .isTokenValid(true)
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
    private void revokeAllClientTokens(Client client){
        var validUserTokens = tokenRepository.findAllValidTokenByUser(client.getId());
        if(validUserTokens.isEmpty()) return;
        validUserTokens.forEach(t->{
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
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
    private void saveUserToken(Client client, String jwtToken) {
        var token = Token.builder()
                .client(client)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }
//    public void refreshAgentToken(
//            HttpServletRequest request, HttpServletResponse response
//    ) throws IOException {
//        final String authHeader = request.getHeader("Authorization");
//        final String refreshToken;
//        final String agentEmail;
//        // the goal here is to check for the jwt token
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            return;
//        }
//        // contains "Bearer " including the space, extracting the JWT token
//        refreshToken = authHeader.substring(7);
//
//        // extracting the userEmail from the JWT token
//        agentEmail = jwtService.extractUsername(refreshToken);
//        // we have the agent Email but he is not authenticated
//        if (agentEmail != null) {
//            var userDetails = this.agentCrud.findAgentByEmail(agentEmail).orElseThrow();
//            if (jwtService.isTokenValid(refreshToken, userDetails)) {
//                var accessToken = jwtService.generateToken(userDetails);
//                revokeAllAgentTokens(userDetails);
//                saveAgentToken(userDetails, accessToken);
//                var authResponse = AgentAuthenticationResponse.builder().accessToken(accessToken)
//                        .refreshToken(refreshToken)
//                        .build();
//                new ObjectMapper().writeValue(response.getOutputStream(),authResponse);
//            }
//        }
//    }
//
//    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        final String authHeader=request.getHeader("Authorization");
//        final String refreshToken;
//        final String userPhone;
//        if(authHeader==null||!authHeader.startsWith("Bearer ")){
//            return;
//        }
//        refreshToken =authHeader.substring(7);
//
//        // todo : extract the client phone number from the jwt token
//        userPhone=jwtService.extractUsername(refreshToken);
//
//        // ? : if we find the phone number and the client is not yet authenticated
//        if(userPhone!=null ){
//
//            // ! extract the user details with the phone number from the DATABASE
//            var client = this.repository.findByPhoneNumber(userPhone).orElseThrow();
//
//
//            // ! verify if the token is valid and then add it we create a authentication object with the user details and authorities
//            if(jwtService.isTokenValid(refreshToken,client)){
//                var accessToken = jwtService.generateToken(client);
//                // ! we should revoke all the client tokens before storing the new one
//                revokeAllClientTokens(client);
//                // ! we store the clients token to work with it when we want to log out
//                saveUserToken(client, accessToken);
//                var authResponse = AuthenticationResponse.builder()
//                        .accessToken(accessToken)
//                        .refreshToken(refreshToken)
//                        .build();
//                new ObjectMapper().writeValue(response.getOutputStream(),authResponse);
//            }
//        }
//
//    }







}
