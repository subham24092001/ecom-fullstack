package com.subham.ecom_proj.repo;
import com.subham.ecom_proj.model.User;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}