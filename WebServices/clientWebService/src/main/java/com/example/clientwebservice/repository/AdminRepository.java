package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.Admin;
import com.example.clientwebservice.model.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin,Integer> {
    Optional<Admin> findAdminByEmail(String email);
}
