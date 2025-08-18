package com.subham.ecom_proj.controller;

import com.subham.ecom_proj.model.User;
import com.subham.ecom_proj.security.JwtUtil;
import com.subham.ecom_proj.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<User> signup(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        String username = req.get("username");
        String password = req.get("password");
        System.out.println("Trying login: " + username + " / " + password);

        return userService.findByUsername(username)
            .filter(u -> userService.checkPassword(password, u.getPassword()))
            .<ResponseEntity<?>>map(u -> ResponseEntity.ok(Map.of("token", jwtUtil.generateToken(username))))
            .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }
}
