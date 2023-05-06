package com.example.clientwebservice.service;

import com.example.clientwebservice.ClientDetails;
import com.example.clientwebservice.CreateClientRequest;
import com.example.clientwebservice.CreateClientResponse;
import com.example.clientwebservice.dataModel.BankAccountCrud;
import com.example.clientwebservice.dataModel.Client;
import com.example.clientwebservice.dataModel.ClientCrud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateClientService {
    private BankAccountCrud bankAccountCrud;
    private ClientCrud clientCrud;

    @Autowired
    public CreateClientService(BankAccountCrud bankAccountCrud, ClientCrud clientCrud) {
        this.bankAccountCrud = bankAccountCrud;
        this.clientCrud = clientCrud;
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
        clientCrud.save(client);
        response.setIsCreated(true);
        response.setErrorMessage(null);
        return response;
    }

    public boolean isClientHadBankAccount(String phone){
        return bankAccountCrud.findByPhoneNumber(phone)!=null;
    }
    public boolean isClientAlreadyHadJabakalahClient(String phone){
        return clientCrud.findByPhoneNumber(phone)!=null;
    }

}
