package com.careerhub.backend.controller;

import java.util.List;
import java.util.Optional;

import com.careerhub.backend.entity.User;
import com.careerhub.backend.service.JwtService;
import com.careerhub.backend.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(
            UserService userService,
            JwtService jwtService) {

        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public User registerUser(
            @Valid @RequestBody User user) {

        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public Object loginUser(
            @RequestBody User user) {

        Optional<User> loggedInUser =
                userService.loginUser(
                        user.getEmail(),
                        user.getPassword()
                );

        if (loggedInUser.isPresent()) {

            User loggedUser =
                    loggedInUser.get();

            String token =
                    jwtService.generateToken(
                            loggedUser.getEmail(),
                            loggedUser.getRole()
                    );

            return token;
        }

        return "Invalid email or password";
    }

    @GetMapping("/me")
    public User getCurrentUser(
            @RequestHeader("Authorization")
            String authHeader) {

        String token =
                authHeader.substring(7);

        String email =
                jwtService.extractEmail(token);

        return userService
                .getUserByEmail(email)
                .orElse(null);
    }

    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }
}