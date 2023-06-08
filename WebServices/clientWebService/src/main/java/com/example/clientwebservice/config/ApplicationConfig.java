package com.example.clientwebservice.config;

import com.example.clientwebservice.repository.AgentRepository;
import com.example.clientwebservice.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    private final AgentRepository agentCrud;
    private final ClientRepository repository;

//    @Bean
//    public UserDetailsService userDetailsService()
//    {
//        return (UserDetailsService) username -> {
//            if (username.contains("@")) {
//                return agentCrud.findAgentByEmail(username);
//            }
//            else {
//                return repository.findByPhoneNumber(username);
//            }
//        }
//    }
    // ? we implement UserDetailsService to fetch user by username == phone number from DB
    @Bean
    public UserDetailsService userDetailsService(){
        return username -> {
            if(username.contains("@"))
            {
                return agentCrud.findAgentByEmail(username).orElseThrow(()-> new UsernameNotFoundException("Agent not found"));
            }
            else {
                return repository.findByPhoneNumber(username).orElseThrow(()-> new UsernameNotFoundException("Client not found"));
            }
        };
    };
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;

    }
//    @Bean
//    public AuthenticationProvider agentAuthenticationProvider()
//    {
//        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//        authProvider.setUserDetailsService(agentDetailsService());
//        authProvider.setPasswordEncoder(passwordEncoder());
//        return authProvider;
//    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    @Bean
    public  PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();

    }
}
