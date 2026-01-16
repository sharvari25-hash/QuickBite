package com.quickbite.food_delivery_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users", 
       uniqueConstraints = { 
           @UniqueConstraint(columnNames = "email") 
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String fullName;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private ERole role;

  public User(String fullName, String email, String password, ERole role) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
