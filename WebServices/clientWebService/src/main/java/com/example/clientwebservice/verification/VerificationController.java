package com.example.clientwebservice.verification;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/verify")
@RequiredArgsConstructor
public class VerificationController {
    private final VerificationService service;
    @PostMapping
    public ResponseEntity<VerificationResponse> activate(
            @RequestBody VerificationRequest request, @RequestHeader Map<String, String> headers){
        String authHeader = headers.get("authorization");
        return ResponseEntity.ok(service.verify(request,authHeader));

    }
}
