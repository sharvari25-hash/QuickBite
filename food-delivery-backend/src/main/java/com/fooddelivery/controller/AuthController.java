package com.fooddelivery.controller;


import com.fooddelivery.entity.User;
import com.fooddelivery.security.JwtService;
import com.fooddelivery.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userService.registerUser(user);
        return "Registration successful";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user, HttpServletResponse response) {
        var authToken = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        authManager.authenticate(authToken);

        String jwtToken = jwtService.generateToken(user.getEmail());

        // Optionally set in header
        response.setHeader("Authorization", "Bearer " + jwtToken);

        return jwtToken;
    }
}
