package com.fooddelivery.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fooddelivery.entity.RestaurantDetails;
import com.fooddelivery.repository.RestaurantDetailsRepository;

@Service
public class RestaurantService {

	@Autowired
	private RestaurantDetailsRepository restaurantRepository;
	
	public RestaurantDetails addRestaurant(RestaurantDetails restaurant) {
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
