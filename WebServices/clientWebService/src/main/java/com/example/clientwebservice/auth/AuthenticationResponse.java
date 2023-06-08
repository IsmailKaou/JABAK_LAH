package com.example.clientwebservice.auth;

import com.example.clientwebservice.model.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;

//    private boolean isVerified;
    private int id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String ceiling;
    private String emailAddress;
    @JsonProperty("tokenValid")
    private boolean isTokenValid;
    private String status;
    private long expirationIn;
}
