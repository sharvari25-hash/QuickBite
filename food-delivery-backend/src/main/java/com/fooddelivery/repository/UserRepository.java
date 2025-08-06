package com.fooddelivery.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.fooddelivery.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {
		
	 Optional<User> findByEmail(String email);
	    boolean existsByEmail(String email);
}
