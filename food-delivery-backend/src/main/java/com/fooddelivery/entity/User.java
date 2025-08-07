package com.fooddelivery.entity;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fooddelivery.enums.RoleType;
import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String name;

    private String mobileNumber;

    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleType role;

    private boolean enabled = true;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private RestaurantDetails restaurantDetails;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private DeliveryDetails deliveryDetails;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


		public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public RoleType getRole() {
		return role;
	}

	public void setRole(RoleType role) {
		this.role = role;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public RestaurantDetails getRestaurantDetails() {
		return restaurantDetails;
	}

	public void setRestaurantDetails(RestaurantDetails restaurantDetails) {
		this.restaurantDetails = restaurantDetails;
	}

	public DeliveryDetails getDeliveryDetails() {
		return deliveryDetails;
	}

	public void setDeliveryDetails(DeliveryDetails deliveryDetails) {
		this.deliveryDetails = deliveryDetails;
	}

	@Override
	 public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

	@Override
	 public String getUsername() {
        return email;
    }
	@Override
	public boolean isAccountNonExpired() {
	    return true;
	}

	@Override
	public boolean isAccountNonLocked() {
	    return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	public RoleType getRoleType() {
	    return role;
	}

	
	
}
