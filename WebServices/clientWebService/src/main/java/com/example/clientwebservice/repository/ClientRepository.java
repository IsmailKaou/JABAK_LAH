package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.Client;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client,Integer> {
    Client findByPhoneNumber(String phoneNumber);
}
