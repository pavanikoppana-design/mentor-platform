package com.pavani.mentor_platform.controller;

import com.pavani.mentor_platform.entity.User;
import com.pavani.mentor_platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register User
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        userRepository.save(user);
        return "User registered successfully! ID: " + user.getId();
    }

    // Login User
    @PostMapping("/login")
    public User loginUser(@RequestBody User loginData) {
        Optional<User> user = userRepository.findByEmailAndPassword(
                loginData.getEmail(),
                loginData.getPassword()
        );

        return user.orElse(null);
    }

    // Get All Users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}