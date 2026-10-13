package com.careerhub.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getKey() {

        return Keys.hmacShaKeyFor(
                secret.getBytes()
        );
    }

    public String generateToken(
            String email,
            String role) {

        return Jwts.builder()

                // Store user's email in token
                .subject(email)

                // Store user's role in token
                .claim("role", role)

                // Token creation time
                .issuedAt(new Date())

                // Token expires after 1 day
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 86400000
                        )
                )

                .signWith(getKey())
                .compact();
    }

    public String extractEmail(String token) {

        // Read claims from JWT
        Claims claims =
                getClaims(token);

        return claims.getSubject();
    }

    public String extractRole(String token) {

        // Read role from JWT
        Claims claims =
                getClaims(token);

        return claims.get(
                "role",
                String.class
        );
    }

    private Claims getClaims(String token) {

        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}