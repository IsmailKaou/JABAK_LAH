package com.example.clientwebservice.config;

import com.example.clientwebservice.repository.AgentTokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AgentLogoutService implements LogoutHandler {
    private final AgentTokenRepository agentTokenRepository;
    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        // the goal here is to check for the jwt token
        if(authHeader==null || !authHeader.startsWith("Bearer ")){
            // passes the request and response to the next filter
            return;
        }
        // contains "Bearer " including the space, extracting the JWT token
        jwt = authHeader.substring(7);
        var storedToken = agentTokenRepository.findByToken(jwt)
                .orElse(null);
        if (storedToken !=null){
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            agentTokenRepository.save(storedToken);
        }
    }
}
