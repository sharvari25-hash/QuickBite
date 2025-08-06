package com.fooddelivery.repository;

import org.springframework.data.repository.CrudRepository;

import com.fooddelivery.entity.DeliveryDetails;

public interface DeliveryDetailsRepository extends CrudRepository<DeliveryDetails, Long> {

}
