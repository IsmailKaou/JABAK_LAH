package com.example.clientwebservice.config;


import com.example.clientwebservice.repository.ClientRepository;
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
    private final ClientRepository clientRepository;
    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull  HttpServletResponse response,@NonNull  FilterChain filterChain) throws ServletException, IOException {

        // todo extract the jwt token from the request
        final String authHeader=request.getHeader("Authorization");
        final String jwt;
        final String userPhone;
        if(authHeader==null||!authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
        return;
        }
        jwt =authHeader.substring(7);

        // todo : extract the client phone number from the jwt token
        userPhone=jwtService.extractUsername(jwt);

        // ? : if we find the phone number and the client is not yet authenticated
        if(userPhone!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            
            // ! extract the user details with the phone number from the DATABASE
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userPhone);

            // ! here we check if the token is not expired and is not revoked
            var isTokenValid = tokenRepository.findByToken(jwt)
                    .map(t -> !t.isExpired() && !t.isRevoked())
                    .orElse(false);
            // ! verify if the token is valid and then add it we create a authentication object with the user details and authorities
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
