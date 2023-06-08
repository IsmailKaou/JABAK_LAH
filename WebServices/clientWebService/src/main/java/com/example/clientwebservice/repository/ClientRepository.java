package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface ClientRepository extends JpaRepository<Client,Integer> {
    Optional<Client> findByPhoneNumber(String phoneNumber);
    @Query("SELECT c FROM Client c")
    List<Client> getAllClients();
}
