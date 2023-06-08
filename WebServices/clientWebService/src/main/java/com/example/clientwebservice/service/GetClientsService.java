package com.example.clientwebservice.service;

import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GetClientsService {

    @Autowired
    ClientRepository clientRepository ;

    public List<Client> getClients(){
        List<Client> clients = clientRepository.findAll();
        List<Client> clientsNew = new ArrayList<>();
        for (Client c: clients
             ) {
            System.out.println(c.getFirstName());
            clientsNew.add(c);
        }
        System.out.println("Hello");
        return  clientsNew;
    }
}
