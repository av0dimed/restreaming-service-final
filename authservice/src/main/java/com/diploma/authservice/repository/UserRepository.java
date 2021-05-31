package com.diploma.authservice.repository;

import com.diploma.authservice.repository.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);

    List<User> findAllByManager(String manager);

    List<User> findAllByRole(String role);

}
