package com.fooddelivery.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fooddelivery.entity.DeliveryDetails;
import com.fooddelivery.entity.User;
import com.fooddelivery.enums.RoleType;
import com.fooddelivery.repository.DeliveryDetailsRepository;
import com.fooddelivery.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class DeliveryDetailsService {

		@Autowired
		private DeliveryDetailsRepository deliveryRepository;
		@Autowired
		private PasswordEncoder passwordEncoder;
		
		@Autowired 
		private UserRepository userRepository;
		
		@Transactional
	    public DeliveryDetails addDeliveryPerson(Map<String, Object> payload) {
	        
	        // 1. Manually create the User object from the Map
	        User user = new User();
	        user.setName((String) payload.get("name"));
	        user.setEmail((String) payload.get("email"));
	        user.setMobileNumber((String) payload.get("mobileNumber"));
	        
	        // 2. Hash the password from the Map. This is a critical security step.
	        user.setPassword(passwordEncoder.encode((String) payload.get("password")));
	        
	        // 3. Set the user's role to DELIVERY.
	        user.setRole(RoleType.DELIVERY);

	        // 4. Manually create the DeliveryDetails object from the Map
	        DeliveryDetails deliveryDetails = new DeliveryDetails();
	        deliveryDetails.setVehicleType((String) payload.get("vehicleType"));
	        deliveryDetails.setLicenseNumber((String) payload.get("licenseNumber"));
	        deliveryDetails.setIdProofUrl((String) payload.get("idProofUrl"));
	        deliveryDetails.setZone((String) payload.get("zone"));

	        // 5. Link the new User to the new DeliveryDetails record.
	        deliveryDetails.setUser(user);

	        // 6. Save the new User first.
	        userRepository.save(user);
	        
	     // 7. Save and return the new DeliveryDetails record.
	        //    JPA will correctly handle the foreign key relationship.
			return deliveryRepository.save(deliveryDetails);
		}

	        
	    public Optional<DeliveryDetails> getById(Long id) {
	        return deliveryRepository.findById(id);
	    }

	    public List<DeliveryDetails> getAllDeliveryPersons() {
	        return (List<DeliveryDetails>) deliveryRepository.findAll();
	    }

	    public DeliveryDetails updateDeliveryDetails(Long id, DeliveryDetails updated) {
	        DeliveryDetails existing = deliveryRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Delivery person not found"));

	        existing.setVehicleType(updated.getVehicleType());
	        // Update more fields as needed

	        return deliveryRepository.save(existing);
	    }

	    public void deleteDeliveryPerson(Long id) {
	        deliveryRepository.deleteById(id);
	    }
		
}
