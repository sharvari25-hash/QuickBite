package com.fooddelivery.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fooddelivery.entity.RestaurantDetails;
import com.fooddelivery.entity.User;
import com.fooddelivery.enums.RoleType;
import com.fooddelivery.repository.RestaurantDetailsRepository;
import com.fooddelivery.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class RestaurantService {

	@Autowired
	private RestaurantDetailsRepository restaurantRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired 
	private UserRepository userRepository;
	
	// --- THIS IS THE NEW, CORRECTED REGISTRATION METHOD ---
	@Transactional
    public RestaurantDetails addRestaurant(Map<String, Object> payload) {
        
        // 1. Manually create the User object from the Map
        User user = new User();
        // We must cast the objects from the map to their correct type (String)
        user.setName((String) payload.get("name"));
        user.setEmail((String) payload.get("email"));

        user.setMobileNumber((String) payload.get("mobileNumber"));
        
        // 2. Hash the password from the Map. This is critical.
        user.setPassword(passwordEncoder.encode((String) payload.get("password")));
        
        // 3. Set the user's role. This is also critical.
        user.setRole(RoleType.RESTAURANT);

        // 4. Manually create the RestaurantDetails object from the Map
        RestaurantDetails restaurant = new RestaurantDetails();
        restaurant.setBusinessName((String) payload.get("businessName"));
        restaurant.setGstin((String) payload.get("gstin"));
        restaurant.setFssaiNumber((String) payload.get("fssaiNumber"));
        restaurant.setAddress((String) payload.get("address"));
        restaurant.setCity((String) payload.get("city"));
        restaurant.setState((String) payload.get("state"));
        restaurant.setPostalCode((String) payload.get("postalCode"));
        restaurant.setOpeningHours((String) payload.get("openingHours"));
        restaurant.setClosingHours((String) payload.get("closingHours"));

        // 5. Link the new User to the new Restaurant
        restaurant.setUser(user);

        // 6. Save both entities. With cascading, saving the restaurant will also save the user.
        //    To be safe, you can save the user explicitly first.
        userRepository.save(user);
        return restaurantRepository.save(restaurant);
    }

	public Optional<RestaurantDetails> getRestaurantById(Long id) {
        return restaurantRepository.findById(id);
    }
	
    public List<RestaurantDetails> getAllRestaurants() {
        return (List<RestaurantDetails>) restaurantRepository.findAll();
    }

    
    public RestaurantDetails updateRestaurant(Long id, RestaurantDetails updated) {
        RestaurantDetails existing = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        existing.setBusinessName(updated.getBusinessName());
        existing.setOpeningHours(updated.getOpeningHours());
        existing.setClosingHours(updated.getClosingHours());
        // Update more fields as needed

        return restaurantRepository.save(existing);
    }

    
    public void deleteRestaurant(Long id) {
        restaurantRepository.deleteById(id);
    }
}
