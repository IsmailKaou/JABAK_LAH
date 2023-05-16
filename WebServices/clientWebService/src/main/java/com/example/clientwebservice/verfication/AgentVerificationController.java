package com.example.clientwebservice.verfication;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v2/verify")
@RequiredArgsConstructor
public class AgentVerificationController {
    private final AgentVerificationService service;
    @PostMapping
    public ResponseEntity<VerificationResponse> activate(
            @RequestBody VerificationRequest request, @RequestHeader Map<String, String> headers){
        String authHeader = headers.get("authorization");
        System.out.println("/n"+authHeader+"/n");
        return ResponseEntity.ok(service.verify(request,authHeader));

    }
}
