package com.example.clientwebservice.config;


import com.example.clientwebservice.model.Agent;
import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.repository.AgentTokenRepository;
//import com.example.clientwebservice.repository.ClientRepository;
import com.example.clientwebservice.repository.TokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
//    private final ClientRepository clientRepository;
    private final TokenRepository tokenRepository;
    private final AgentTokenRepository AgentTokenRepository;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull  HttpServletResponse response,
            @NonNull  FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader=request.getHeader("Authorization");
        final String jwt;
        final String userLogin;
        if(authHeader==null||!authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
        return;
        }
        jwt =authHeader.substring(7);

        userLogin=jwtService.extractUsername(jwt);
        // ? : if we find the phone number and the client is not yet authenticated
        if(userLogin!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            
            // ! extract the user details with the phone number from the DATABASE
            UserDetails userDetails=this.userDetailsService.loadUserByUsername(userLogin);
            // ! here we check if the token is not expired and is not revoked
            boolean isTokenValid;
            if(userLogin.contains("@"))
            {
                isTokenValid = AgentTokenRepository.findByToken(jwt)
                        .map(t -> !t.isExpired() && !t.isRevoked())
                        .orElse(false);

            }
            else
            {
                isTokenValid = tokenRepository.findByToken(jwt)
                        .map(t -> !t.isExpired() && !t.isRevoked())
                        .orElse(false);
            }

            // ! verify if the token is valid and then add it we create an authentication object with the user details and authorities
            if(jwtService.isTokenValid(jwt,userDetails) && isTokenValid){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request,response);
    }
}
