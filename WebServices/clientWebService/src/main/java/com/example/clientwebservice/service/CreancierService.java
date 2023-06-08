package com.example.clientwebservice.service;

import com.example.clientwebservice.model.Creancier;
import com.example.clientwebservice.repository.CreancierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreancierService {
    @Autowired
    CreancierRepository creancierRepository;

    public List<Creancier> getCreanciers(){
        System.out.println("i am in service");
        return (List<Creancier>) creancierRepository.findAll();
    }
}
