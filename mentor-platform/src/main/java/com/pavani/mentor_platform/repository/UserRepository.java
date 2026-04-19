package com.pavani.mentor_platform.repository;

import com.pavani.mentor_platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email and password (for login)
    Optional<User> findByEmailAndPassword(String email, String password);

    // Find user by email (for checking if email exists)
    Optional<User> findByEmail(String email);
}