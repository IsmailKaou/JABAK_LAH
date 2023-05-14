package com.example.clientwebservice.service;

import com.example.clientwebservice.ClientDetails;
import com.example.clientwebservice.CreateClientRequest;
import com.example.clientwebservice.CreateClientResponse;
import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.model.Role;
import com.example.clientwebservice.repository.BankRepository;
import com.example.clientwebservice.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateClientService {
    private final PasswordEncoder passwordEncoder;
    private final BankRepository bankAccountCrud;
    private final ClientRepository clientRepository;
    private final RandomPasswordGenerator randomPasswordGenerator;
    private final SmsService smsService;
    public CreateClientResponse createClient(CreateClientRequest request){

        CreateClientResponse response = new CreateClientResponse();
        ClientDetails clientDetails = request.getClientDetails();

        if(!clientHasBankAccount(clientDetails.getPhoneNumber())  ){
            response.setIsCreated(false);
            response.setErrorMessage("This client does not have a bank account");
            return response;
        }
        if(clientHasPaymentAccount(clientDetails.getPhoneNumber())){
            response.setIsCreated(false);
            response.setErrorMessage("This client already has an account in JABAKALAH");
            return response;
        }
        Client client = new Client();
        String password = randomPasswordGenerator.generatePassayPassword();
        System.out.printf(password);
        client.setFirstName(clientDetails.getFirstName());
        client.setLastName(clientDetails.getLastName());
        client.setPhoneNumber(clientDetails.getPhoneNumber());
        client.setEmailAddress(clientDetails.getEmailAddress());
        client.setCeiling(clientDetails.getCeiling());
        client.setActive(false);
        client.setPassword(passwordEncoder.encode(password));
        client.setRole(Role.UNVERIFIED_USER);
        //smsService.sendSMS("Your password : "+password,"212633166669");
        System.out.printf("Password is "+ password +"\n");
        System.out.printf("Made it here \n");
        clientRepository.save(client);
        response.setIsCreated(true);
        response.setErrorMessage(null);
        return response;
    }

    public boolean clientHasBankAccount(String phone){
        System.out.printf("gfgfgf");
        return bankAccountCrud.findByPhoneNumber(phone)!=null;
    }
    public boolean clientHasPaymentAccount(String phone){
        System.out.printf("gggg");
        return clientRepository.findByPhoneNumber(phone).isPresent();
    }


}
