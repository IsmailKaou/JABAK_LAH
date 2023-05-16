package com.example.clientwebservice.verification;

import com.example.clientwebservice.config.JwtService;
import com.example.clientwebservice.model.Role;
import com.example.clientwebservice.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VerificationService {
    private final JwtService jwtService;
    private final ClientRepository repository;
    private final PasswordEncoder passwordEncoder;
    public VerificationResponse verify(VerificationRequest request, String authHeader) {
        final String jwt;
        final String userPhone;
        jwt =authHeader.substring(7);
        userPhone=jwtService.extractUsername(jwt);
        var client = repository.findByPhoneNumber(userPhone).orElseThrow();
        client.setRole(Role.VERIFIED_USER);
        client.setPassword(passwordEncoder.encode(request.getNewPassword()));
        repository.save(client);
        return VerificationResponse.builder().msg("Account has been verified").build();
    }
}
