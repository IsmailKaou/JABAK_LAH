package com.example.clientwebservice.auth;

import com.example.clientwebservice.config.JwtService;
import com.example.clientwebservice.model.*;
import com.example.clientwebservice.repository.AgentRepository;
import com.example.clientwebservice.repository.AgentTokenRepository;
import org.springframework.beans.factory.annotation.Value;
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
public class RegisterService {
    private final AgentRepository agentCrud;
    private final ClientRepository repository;
    private final AgentTokenRepository agentTokenRepository;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
    private final PasswordEncoder passwordEncoder;

    public AgentAuthenticationResponse register(AgentAuthenticationRequest request) {

        var agent = Agent.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.UNVERIFIED_USER)
                .build();
        agentCrud.save(agent);

        return AgentAuthenticationResponse.builder()

                .email(agent.getEmail())
                .build();
    }
}