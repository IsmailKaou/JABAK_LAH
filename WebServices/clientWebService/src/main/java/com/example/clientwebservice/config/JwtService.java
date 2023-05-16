package com.example.clientwebservice.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


// todo : this is the validationJWT service : what are the methods in this class ??
// ? : a method to extract claims or one claim form the jwt token
// ? : a method to extract the client phone number from the jwt token
// ? : a method to generate a token with clientDetails and extraClaims
// ? : a method that validate the jwt token
@Service
public class JwtService {
    @Value("${application.security.jwt.secret-key}")
    private  String secretKey;

    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;

    // ! we use this method to extract the client phone number from the jwt token
    public String extractUsername(String token) {
        return extractClaim(token,Claims::getSubject);
    }

    // ! this method is used to generate the with only userDetails
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }

    // ! this method is used to generate a token with userDetails and extraClaims(authorities...)
    public String generateToken(Map<String,Object> extraClaims, UserDetails userDetails){
        return buildToken(extraClaims, userDetails,jwtExpiration);

    }
    public String generateRefreshToken(UserDetails userDetails){
        return buildToken(new HashMap<>(), userDetails,refreshExpiration);

    }

    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails,long expiration) {
        return Jwts.builder().setClaims(extraClaims)
                .setSubject(userDetails.getUsername()) // * the subject is the client identifier that is phone number
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }




    // ! method that validates the token ( if the username on the token is equal to the userDetails one and the token not expired)
    public boolean isTokenValid(String token,UserDetails userDetails){
        final String username=extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);

    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
    }

    // ! We use this function to extract a specific Claim from the jwt token (Claims == some info about the client)
    public <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims=extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // ! we use this function to extract all the claims in our jwt token
    private Claims extractAllClaims(String token){
        return Jwts.
                parserBuilder()
                .setSigningKey(getSignInKey()) // * to generate or 'decode' a token we need to use a signing key
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ! function used to sign In the Secret Key
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
