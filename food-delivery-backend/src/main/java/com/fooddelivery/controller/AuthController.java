package com.fooddelivery.controller;


import com.fooddelivery.entity.AddressDetails;
import com.fooddelivery.entity.DeliveryDetails;
import com.fooddelivery.entity.RestaurantDetails;
import com.fooddelivery.entity.User;
import com.fooddelivery.enums.RoleType;
import com.fooddelivery.security.JwtService;
import com.fooddelivery.service.AddressDetailsService;
import com.fooddelivery.service.DeliveryDetailsService;
import com.fooddelivery.service.RestaurantService;
import com.fooddelivery.service.UserService;
import jakarta.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private RestaurantService restaurantService;
    
    @Autowired
    private DeliveryDetailsService deliveryService;
    
    @Autowired
    private AddressDetailsService addressService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    @PostMapping("/register/customer")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
    	user.setRole(RoleType.CUSTOMER);
       User savedUser = userService.registerUser(user);
        String jwtToken = jwtService.generateToken(savedUser.getEmail());
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("token", jwtToken);
        responseBody.put("user", savedUser);
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
        var authToken = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        authManager.authenticate(authToken);

        String jwtToken = jwtService.generateToken(user.getEmail());

        // You can also fetch user details if needed
        User dbUser = userService.findByEmail(user.getEmail());

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("token", jwtToken);
        responseBody.put("role", dbUser.getRoleType()); // If you want to send role
        responseBody.put("email", dbUser.getEmail());
        responseBody.put("name", dbUser.getName());

        return ResponseEntity.ok(responseBody);
    }
    
    @PostMapping("/admin/users/create")
    public ResponseEntity<?> createAdminUser(@RequestBody Map<String, String> payload) {
        
        try {
            // 1. Manually create the User object
            User newUser = new User();

            // 2. Safely get the values from the payload Map
            String name = payload.get("name");
            String email = payload.get("email");
            String password = payload.get("password");
            String roleType = payload.get("roleType"); // This will be "ADMIN"

            // 3. Check for missing data
            if (name == null || email == null || password == null || roleType == null) {
                // Return a clear JSON error message
                return ResponseEntity.badRequest().body(Map.of("message", "Error: Missing required fields (name, email, password, roleType)."));
            }

            // 4. Set the fields on the new User object
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setPassword(password); // Pass raw password to the service for encoding
            
            // This line is now safe because roleType is a guaranteed String from the Map
            newUser.setRole(RoleType.valueOf(roleType.toUpperCase()));

            // 5. Call your service to handle encoding and saving
            User savedUser = userService.registerUser(newUser);

            // 6. Return the created user as JSON, which the frontend expects
            return ResponseEntity.ok(savedUser);

        } catch (Exception e) {
            // Catch any other unexpected errors (like a bad roleType string)
            // and return a proper JSON error response.
            return ResponseEntity.status(500).body(Map.of("message", "Error creating user: " + e.getMessage()));
        }
    }
    
    @PostMapping("/register/restaurant")
    public RestaurantDetails addRestaurant(@RequestBody Map<String, Object> payload) {
        return restaurantService.addRestaurant(payload);
    }

    
    @PostMapping("/register/delivery")
    public DeliveryDetails addDeliveryPerson(@RequestBody Map<String, Object> payload) {
		return deliveryService.addDeliveryPerson(payload);	
    }
    
    @PostMapping("register/address")
    public AddressDetails addAddress(@RequestBody Map<String, Object> payload) {
		return addressService.addAddress(payload);
    	
    }
}
