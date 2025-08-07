package com.fooddelivery.service;

import java.util.*;

import javax.management.ServiceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fooddelivery.entity.AddressDetails;
import com.fooddelivery.entity.User;
import com.fooddelivery.repository.AddressDetailsRepository;
import com.fooddelivery.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fooddelivery.entity.AddressDetails;
import com.fooddelivery.repository.AddressDetailsRepository;

@Service
public class AddressDetailsService {

	@Autowired
	private AddressDetailsRepository addressRepository;
	

	@Autowired 
	private UserRepository userRepository;
	
	@Transactional
	public AddressDetails addAddress(Map<String, Object> payload) {
	    
	    // 1. Get the user_id from the payload and find the existing User.
	    // This part is perfect.
	    Object userIdObj = payload.get("user_id");
	    if (userIdObj == null) {
	        throw new IllegalArgumentException("Error: 'user_id' is missing from the payload.");
	    }
	    Long userId = ((Number) userIdObj).longValue();
	    User existingUser = userRepository.findById(userId)
	            .orElseThrow(() -> new IllegalArgumentException("Cannot create address. User not found with id: " + userId));

	    // 2. Manually create the AddressDetails object from the Map payload.
	    // This part is perfect.
	    AddressDetails address = new AddressDetails();
	    address.setLabel((String) payload.get("label"));
	    address.setStreet((String) payload.get("street"));
	    address.setCity((String) payload.get("city"));
	    address.setState((String) payload.get("state"));
	    address.setCountry((String) payload.get("country"));
	    address.setPostalCode((String) payload.get("postal_code"));
	    Boolean isDefault = (Boolean) payload.get("is_default");
	    address.setDefault(isDefault != null && isDefault);

	    // 3. Link the new Address to the existing User.
	    // This part is perfect.
	    address.setUser(existingUser);

	    // 4. --- THE MISSING STEP ---
	    // Save the fully prepared address object to the database and return it.
	    return addressRepository.save(address);
	}

        // 4. Save the new AddressDetails entity.
        // Because we are in a @Transactional method, the operation is atomic.
        // We don't need to save the user again since it already exists.

    public AddressDetails addAddress(AddressDetails address) {
        return addressRepository.save(address);
    }

    public Optional<AddressDetails> getAddressById(Long id) {
        return addressRepository.findById(id);
    }

    public List<AddressDetails> getAllAddresses() {
        return (List<AddressDetails>) addressRepository.findAll();
    }

    public AddressDetails updateAddress(Long id, AddressDetails updated) {
        AddressDetails existing = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        existing.setStreet(updated.getStreet());
        existing.setCity(updated.getCity());
        existing.setPostalCode(updated.getPostalCode());
        // Add more fields

        return addressRepository.save(existing);
    }

    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }
}

