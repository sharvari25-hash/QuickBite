package com.fooddelivery.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fooddelivery.entity.DeliveryDetails;
import com.fooddelivery.repository.DeliveryDetailsRepository;

@Service
public class DeliveryDetailsService {

		@Autowired
		private DeliveryDetailsRepository deliveryRepository;
		
		public DeliveryDetails addDeliveryPerson(DeliveryDetails deliveryDetails) {
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
