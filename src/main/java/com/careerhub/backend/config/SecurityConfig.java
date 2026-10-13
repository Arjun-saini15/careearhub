package com.careerhub.backend.config;

import com.careerhub.backend.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;

        public SecurityConfig(
                        JwtAuthenticationFilter jwtAuthenticationFilter) {

                this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {

                http
                                .csrf(csrf -> csrf.disable())

                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))

                                .authorizeHttpRequests(auth -> auth

                                                .requestMatchers(
                                                                "/api/users/register",
                                                                "/api/users/login")
                                                .permitAll()

                                                .requestMatchers("/api/admins/**")
                                                .hasRole("ADMIN")

                                                .requestMatchers(
                                                                "/api/employer-profiles/**")
                                                .hasAnyRole(
                                                                "EMPLOYER",
                                                                "ADMIN")

                                                .requestMatchers(
                                                                "/api/interviews/**")
                                                .hasAnyRole(
                                                                "JOB_SEEKER",
                                                                "EMPLOYER",
                                                                "ADMIN")

                                                .anyRequest().authenticated())

                                .addFilterBefore(
                                                jwtAuthenticationFilter,
                                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public UserDetailsService userDetailsService() {

                return username -> {
                        throw new UsernameNotFoundException(
                                        "JWT authentication is used");
                };
        }
}