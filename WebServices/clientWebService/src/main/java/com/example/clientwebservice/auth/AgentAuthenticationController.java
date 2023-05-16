package com.example.clientwebservice.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v2/auth")
@RequiredArgsConstructor
public class AgentAuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/authenticate")
    public ResponseEntity<AgentAuthenticationResponse> authenticate(
            @RequestBody AgentAuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticateAgent(request));
    }
    @PostMapping("/refresh-token")
    public void refreshToken(
           HttpServletRequest request,
           HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request,response);
    }

}
