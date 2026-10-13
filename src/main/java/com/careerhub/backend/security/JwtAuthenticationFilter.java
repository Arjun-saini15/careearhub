package com.careerhub.backend.security;

import com.careerhub.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Get JWT token from request header
        String authHeader = request.getHeader("Authorization");

        // Check if Bearer token is present
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            // Remove "Bearer " and get only the token
            String token = authHeader.substring(7);

            try {
                // Get email from JWT
                String email = jwtService.extractEmail(token);

                // Get role from JWT
                String role = jwtService.extractRole(token);

                // Convert role into Spring Security authority
                SimpleGrantedAuthority authority =
                        new SimpleGrantedAuthority("ROLE_" + role);

                // Mark user as authenticated
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                Collections.singletonList(authority)
                        );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);

            } catch (Exception e) {

                // Token is invalid or expired
                System.out.println("Invalid JWT token");
            }
        }

        // Continue the request
        filterChain.doFilter(request, response);
    }
}