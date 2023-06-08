package com.example.clientwebservice.endpoints;

import com.example.clientwebservice.*;
import com.example.clientwebservice.CreateClientResponse;
import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.request.*;
import com.example.clientwebservice.request.CreateClientRequest;
import com.example.clientwebservice.response.*;
import com.example.clientwebservice.service.CreateClientService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint(value="/register")
public class CreateClientEndPoint {
    private static final String NAMESPACE = "http://example.com/clientservice";


    private CreateClientService service;

    @Autowired
    public CreateClientEndPoint(CreateClientService service) {
        this.service = service;
    }

    @PayloadRoot(namespace = NAMESPACE,localPart = "createClientRequest")
    @ResponsePayload
    public CreateClientResponse getCreationStatus(@RequestPayload CreateClientRequest request){
        return service.createClient(request);
    }

    @PayloadRoot(namespace = NAMESPACE,localPart = "updateClientRequest")
    @ResponsePayload
    public UpdateClientResponse updateClient(@RequestPayload UpdateClientRequest request){


        Client client = new Client();
        int clientId = request.getClientId();
        UpdateClientResponse response = new UpdateClientResponse();
        BeanUtils.copyProperties(request.getClientInfo(),client);
        if (service.updateClient(client, clientId) != null){
            response.setIsUpdated(true);
        }else
        {
            response.setErrorMessage("Update not done");
        }



        return response;
    }

    @PayloadRoot(namespace = NAMESPACE,localPart = "deleteClientRequest")
    @ResponsePayload
    public DeleteClientResponse deleteClient(@RequestPayload DeleteClientRequest request){

        DeleteClientResponse response = new DeleteClientResponse();
        service.deleteClient(request.getId());
        return response;
    }



    @PayloadRoot(namespace = NAMESPACE,localPart = "clientHasCreanceRequest")
    @ResponsePayload
    public ClientHasCreanceResponse getClient(@RequestPayload ClientHasCreanceRequest request){

        //  return service.getClient(request);
        return service.clientHasCreance(request);

    }

    @PayloadRoot(namespace = NAMESPACE,localPart = "paymentRequest")
    @ResponsePayload
    public PaymentResponse payBills(@RequestPayload PaymentRequest request){

        return service.canClientPaye(request);

    }


}




