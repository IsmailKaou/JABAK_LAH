package com.example.clientwebservice.service;

import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetClientsService {

    @Autowired
    ClientRepository clientRepository ;

    public List<Client> getClients(){
        return  clientRepository.findAll();
    }
}
