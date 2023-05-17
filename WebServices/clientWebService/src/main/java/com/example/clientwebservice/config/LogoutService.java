package com.example.clientwebservice.config;

import com.example.clientwebservice.repository.TokenRepository;
import com.example.clientwebservice.repository.AgentTokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final AgentTokenRepository agentTokenRepository;
    // ! we implement a logout handler to invalidate the token in the database
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

        final String authHeader=request.getHeader("Authorization");
        final String jwt;
        final String userLogin;
        if(authHeader==null||!authHeader.startsWith("Bearer ")){
            return;
        }
        jwt =authHeader.substring(7);
        userLogin=jwtService.extractUsername(jwt);
        if (userLogin.contains("@"))
        {
            var storedToken = agentTokenRepository.findByToken(jwt).orElse(null);
            if(storedToken !=null){
                storedToken.setExpired(true);
                storedToken.setRevoked(true);
                agentTokenRepository.save(storedToken);
            }
        }
        else {
            var storedToken = tokenRepository.findByToken(jwt).orElse(null);
            if(storedToken !=null){
                storedToken.setExpired(true);
                storedToken.setRevoked(true);
                tokenRepository.save(storedToken);
            }
        }
    }
}
