package com.example.clientwebservice.service;

import com.example.clientwebservice.ClientDetails;
import com.example.clientwebservice.CreateClientRequest;
import com.example.clientwebservice.CreateClientResponse;
import com.example.clientwebservice.repository.BankRepository;
import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateClientService {
    private BankRepository bankRepository;
    private ClientRepository clientRepository;

    @Autowired
    public CreateClientService(BankRepository bankRepository, ClientRepository clientRepository) {
        this.bankRepository = bankRepository;
        this.clientRepository = clientRepository;
    }

    public CreateClientResponse createClient(CreateClientRequest request){

        CreateClientResponse response = new CreateClientResponse();
        ClientDetails clientDetails = request.getClientDetails();

        if(!isClientHadBankAccount(clientDetails.getPhoneNumber())  ){
            response.setIsCreated(false);
            response.setErrorMessage("This Client has not a bank account");
            return response;
        }
        if(isClientAlreadyHadJabakalahClient(clientDetails.getPhoneNumber())){
            response.setIsCreated(false);
            response.setErrorMessage("This Client already had an account in JABAKALAH");
            return response;
        }
        Client client = new Client();
        client.setFirstName(clientDetails.getFirstName());
        client.setLastName(clientDetails.getLastName());
        client.setPhoneNumber(clientDetails.getPhoneNumber());
        client.setEmailAddress(clientDetails.getEmailAddress());
        client.setCeiling(clientDetails.getCeiling());
        clientRepository.save(client);
        response.setIsCreated(true);
        response.setErrorMessage(null);
        return response;
    }

    public boolean isClientHadBankAccount(String phone){
        return bankRepository.findByPhoneNumber(phone)!=null;
    }
    public boolean isClientAlreadyHadJabakalahClient(String phone){
        return clientRepository.findByPhoneNumber(phone)!=null;
    }

}
