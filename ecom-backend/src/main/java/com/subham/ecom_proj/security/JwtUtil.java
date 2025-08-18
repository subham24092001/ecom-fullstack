package com.subham.ecom_proj.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generate secure key
    private final long expirationMs = 3600000; // 1 hour

    // Generate token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key) // ✅ new way (no deprecation warning)
                .compact();
    }

    // Extract username
    public String extractUsername(String token) {
        return parseClaims(token).getBody().getSubject();
    }

    // Validate token
    public boolean validateToken(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return parseClaims(token).getBody().getExpiration().before(new Date());
    }

    // Parse token safely
    private Jws<Claims> parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key) // ✅ parserBuilder instead of parser()
                .build()
                .parseClaimsJws(token);
    }
}
