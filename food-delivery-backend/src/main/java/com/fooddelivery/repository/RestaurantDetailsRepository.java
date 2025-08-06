package com.fooddelivery.repository;

import org.springframework.data.repository.CrudRepository;

import com.fooddelivery.entity.RestaurantDetails;

public interface RestaurantDetailsRepository extends CrudRepository<RestaurantDetails, Long> {

}
