package com.fooddelivery.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fooddelivery.entity.AddressDetails;
import com.fooddelivery.repository.AddressDetailsRepository;

@Service
public class AddressDetailsService {

	@Autowired
	private AddressDetailsRepository addressRepository;
	
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

