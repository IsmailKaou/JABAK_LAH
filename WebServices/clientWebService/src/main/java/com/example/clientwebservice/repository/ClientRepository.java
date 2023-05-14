package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client,Integer> {
    Optional<Client> findByPhoneNumber(String phoneNumber);
}
