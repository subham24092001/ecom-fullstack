package com.subham.ecom_proj.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.subham.ecom_proj.model.User;
import com.subham.ecom_proj.repo.UserRepo;

@RestController
@RequestMapping("/debug")
public class DebugController {

    private final UserRepo userRepository;

    public DebugController(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
}

