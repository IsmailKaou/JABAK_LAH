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
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;
    private final RegisterService registerservice;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));

    }
    @PostMapping("/authenticate/agent")
    public ResponseEntity<AgentAuthenticationResponse> authenticate(
            @RequestBody AgentAuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticateAgent(request));
    }
    @PostMapping("/authenticate/admin")
    public ResponseEntity<AdminAuthenticationResponse> authenticate(
            @RequestBody AdminAuthenticationRequest request
    ){
        System.out.println("Im here in endpoint");
//        System.out.println(request.getEmail());
        return ResponseEntity.ok(service.authenticateAdmin(request));
    }
    @PostMapping("/register")
    public ResponseEntity<AgentAuthenticationResponse> register(
            @RequestBody AgentAuthenticationRequest request
    ){
        return ResponseEntity.ok(registerservice.register(request));
    }
//    @PostMapping("/refresh-token")
//    public void refreshToken(
//            HttpServletRequest request,
//            HttpServletResponse response
//            ) throws IOException {
//        service.refreshAgentToken(request, response);
//    }
}