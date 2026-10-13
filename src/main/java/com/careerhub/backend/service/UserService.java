package com.careerhub.backend.service;

import com.careerhub.backend.entity.User;
import com.careerhub.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {

        String hashedPassword =
                passwordEncoder.encode(user.getPassword());

        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

    public Optional<User> loginUser(
            String email,
            String password) {

        Optional<User> user =
                userRepository.findByEmail(email);

        if (user.isPresent()) {

            boolean passwordMatches =
                    passwordEncoder.matches(
                            password,
                            user.get().getPassword()
                    );

            if (passwordMatches) {
                return user;
            }
        }

        return Optional.empty();
    }

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }
    public Optional<User> getUserByEmail(String email) {

    return userRepository.findByEmail(email);
}
    
}