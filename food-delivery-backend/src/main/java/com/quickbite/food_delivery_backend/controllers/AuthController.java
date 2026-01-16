package com.quickbite.food_delivery_backend.controllers;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quickbite.food_delivery_backend.models.ERole;
import com.quickbite.food_delivery_backend.models.User;
import com.quickbite.food_delivery_backend.payload.request.LoginRequest;
import com.quickbite.food_delivery_backend.payload.request.SignupRequest;
import com.quickbite.food_delivery_backend.payload.response.JwtResponse;
import com.quickbite.food_delivery_backend.payload.response.MessageResponse;
import com.quickbite.food_delivery_backend.repository.UserRepository;
import com.quickbite.food_delivery_backend.security.jwt.JwtUtils;
import com.quickbite.food_delivery_backend.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    String role = userDetails.getAuthorities().stream()
        .findFirst()
        .map(item -> item.getAuthority())
        .orElse(null);

    return ResponseEntity.ok(new JwtResponse(jwt, 
                         userDetails.getId(), 
                         userDetails.getFullName(), 
                         userDetails.getEmail(), 
                         role));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    ERole role = ERole.ROLE_CUSTOMER;
    
    if (signUpRequest.getRole() != null) {
        try {
            role = ERole.valueOf(signUpRequest.getRole());
        } catch (IllegalArgumentException e) {
             // Default to customer or throw error?
             // Let's assume invalid role -> Customer for safety, or error.
             // For now, let's keep it robust.
        }
    }

    User user = new User(signUpRequest.getFullName(), 
               signUpRequest.getEmail(),
               encoder.encode(signUpRequest.getPassword()),
               role);

    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
}
