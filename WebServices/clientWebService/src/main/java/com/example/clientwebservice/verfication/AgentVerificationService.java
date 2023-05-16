package com.example.clientwebservice.verfication;

import com.example.clientwebservice.config.JwtService;
import com.example.clientwebservice.repository.AgentRepository;
import com.example.clientwebservice.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AgentVerificationService {
    private final JwtService jwtService;
    private final AgentRepository agentCrud;
    private final PasswordEncoder passwordEncoder;
    public VerificationResponse verify(VerificationRequest request, String authHeader) {
        final String jwt;
        final String userPhone;
        jwt =authHeader.substring(7);
        userPhone=jwtService.extractUsername(jwt);
        var client = agentCrud.findAgentByEmail(userPhone).orElseThrow();
        client.setRole(Role.VERIFIED_USER);
        client.setPassword(passwordEncoder.encode(request.getNewPassword()));
        agentCrud.save(client);
        return VerificationResponse.builder().msg("Account has been verified").build();
    }

}
