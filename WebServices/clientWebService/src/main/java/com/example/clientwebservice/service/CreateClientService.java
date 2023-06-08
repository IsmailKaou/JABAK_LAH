package com.example.clientwebservice.service;

import com.example.clientwebservice.ClientDetails;
import com.example.clientwebservice.CreateClientResponse;
import com.example.clientwebservice.model.Creance;
import com.example.clientwebservice.request.ClientHasCreanceRequest;
import com.example.clientwebservice.request.CreateClientRequest;
import com.example.clientwebservice.request.GetClientRequest;
import com.example.clientwebservice.request.PaymentRequest;
import com.example.clientwebservice.response.ClientHasCreanceResponse;
import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.model.Role;
import com.example.clientwebservice.repository.BankRepository;
import com.example.clientwebservice.repository.ClientRepository;
import com.example.clientwebservice.response.GetClientResponse;
import com.example.clientwebservice.response.PaymentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

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
        smsService.sendSMS("Your password : "+password,"212633166669");
        System.out.printf("Password is "+ password +"\n");
        System.out.printf("Made it here \n");
        clientRepository.save(client);
        response.setIsCreated(true);
        response.setErrorMessage(null);
        return response;
    }

    public boolean clientHasBankAccount(String phone){
//        System.out.println(phone);
//        System.out.println(bankAccountCrud.findByPhoneNumber(phone));
        return bankAccountCrud.findByPhoneNumber(phone)!=null;
    }
    public boolean clientHasPaymentAccount(String phone){
        System.out.printf("gggg");
        return clientRepository.findByPhoneNumber(phone).isPresent();
    }




    public Client updateClient(Client client , int clientId){

        System.out.println("client service");
        System.out.println(clientId);
        Client clt = clientRepository.findById(clientId).get();
        System.out.println(clt.getId());
        clt.setFirstName(client.getFirstName());
        clt.setLastName(client.getLastName());
        clt.setEmailAddress(client.getEmailAddress());
        clt.setCeiling(client.getCeiling());
        clt.setPhoneNumber(client.getPhoneNumber());
        return clientRepository.save(clt);
    }


    public void deleteClient(int id){

        clientRepository.deleteById(id);

    }
    public GetClientResponse getClient(GetClientRequest getClientRequest){
        GetClientResponse getClientResponse=new GetClientResponse();
        Optional<Client> client=clientRepository.findByPhoneNumber(getClientRequest.getPhoneNumber());
        System.out.printf("here is the phone number "+getClientRequest.getPhoneNumber());
        System.out.printf("here is the client "+String.valueOf(client));
        if(client.isPresent()){
            getClientResponse.setClientExists(true);
            getClientResponse.setMessage("The client exists");
        }
        else{
            getClientResponse.setClientExists(false);
            getClientResponse.setMessage("The provided phone number does not correspond to any of our clients.");
        }

        return  getClientResponse;



    }
    public static List<String> Messages= Arrays.asList(new String[]{"The provided phone number does not correspond to any of our clients.","This client does not have a subscription for this debt.","This client have a subscription for this debt."});


    public ClientHasCreanceResponse clientHasCreance(ClientHasCreanceRequest clientHasCreanceRequest){
        ClientHasCreanceResponse getClientHasCreanceResponse=new ClientHasCreanceResponse();
        Optional<Client> client = clientRepository.findByPhoneNumber(clientHasCreanceRequest.getPhone());

        System.out.printf("here is the phone number "+clientHasCreanceRequest.getPhone());
//        System.out.printf("here is the client "+String.valueOf(client));
        if(!client.isPresent()){
            getClientHasCreanceResponse.setClientExists(false);
            getClientHasCreanceResponse.setClientHasCreance(false);
            getClientHasCreanceResponse.setMessage(Messages.get(0));

        }
        else{
            getClientHasCreanceResponse.setClientExists(true);
            Creance creance=client.get().getCreanceById(clientHasCreanceRequest.getCreanceId());
            if(creance==null){
                getClientHasCreanceResponse.setClientHasCreance(false);
                getClientHasCreanceResponse.setMessage(Messages.get(1));
            }
            else{
                getClientHasCreanceResponse.setClientHasCreance(true);
                getClientHasCreanceResponse.setMessage(Messages.get(2));
            }


            //  getClientHasCreanceResponse.setMessage("The client exists");
        }
        return  getClientHasCreanceResponse;

    }


    public PaymentResponse canClientPaye(PaymentRequest paymentRequest){
        PaymentResponse canClientPayeResponse=new PaymentResponse();
        String phone=paymentRequest.getPhone();
        Optional<Client> client=clientRepository.findByPhoneNumber(phone);

        if(!client.isPresent()){
            canClientPayeResponse.setCanClientPaye(false);
            canClientPayeResponse.setMessage("The number phone provided does not correspond to any of our clients.");
        } else if (Double.parseDouble(client.get().getCeiling())<paymentRequest.getAmount()) {
            canClientPayeResponse.setCanClientPaye(false);
            canClientPayeResponse.setMessage("Payment not possible. Ceiling amount is insufficient.");

        } else if (client.get().getSolde()<paymentRequest.getAmount()) {
            canClientPayeResponse.setCanClientPaye(false);
            canClientPayeResponse.setMessage("You do not have enough funds in your account to complete the payment.");
        }
        else{
            canClientPayeResponse.setCanClientPaye(true);
            canClientPayeResponse.setMessage("You can make the payment.");
        }
        return canClientPayeResponse;
    }
}








