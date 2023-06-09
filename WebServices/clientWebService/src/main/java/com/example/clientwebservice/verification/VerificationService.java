package com.example.clientwebservice.verification;

import com.example.clientwebservice.config.JwtService;
import com.example.clientwebservice.model.Role;
import com.example.clientwebservice.repository.AgentRepository;
import com.example.clientwebservice.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VerificationService {
    private final JwtService jwtService;
    private final ClientRepository repository;
    private final AgentRepository agentRepository;
    private final PasswordEncoder passwordEncoder;
    public VerificationResponse verify(VerificationRequest request, String authHeader) {
        final String jwt;
        final String userLogin;
        String user="";
        jwt =authHeader.substring(7);
        userLogin=jwtService.extractUsername(jwt);
        if (userLogin.contains("@"))
        {
            user="agent";
            var agent = agentRepository.findAgentByEmail(userLogin).orElseThrow();
            agent.setRole(Role.VERIFIED_USER);
            agent.setPassword(passwordEncoder.encode(request.getNewPassword()));
            agentRepository.save(agent);

        }
        else {
            user="client";
            var client = repository.findByPhoneNumber(userLogin).orElseThrow();
            client.setRole(Role.VERIFIED_USER);
            client.setPassword(passwordEncoder.encode(request.getNewPassword()));
            repository.save(client);
        }

        return VerificationResponse.builder().msg("Account has been verified").user(user).build();
    }
}
