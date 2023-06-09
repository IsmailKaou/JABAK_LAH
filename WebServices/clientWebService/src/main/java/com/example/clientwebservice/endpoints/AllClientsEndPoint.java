package com.example.clientwebservice.endpoints;

import com.example.clientwebservice.ClientInfo;
import com.example.clientwebservice.GetClientsRequest;
import com.example.clientwebservice.GetClientsResponse;
import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.service.GetClientsService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import java.util.List;

@Endpoint
public class AllClientsEndPoint {

    @Autowired
    GetClientsService getClientsService ;

    private static final String NAMESPACE = "http://example.com/clientlist";


    @PayloadRoot(namespace = NAMESPACE , localPart = "getClientsRequest")
    @ResponsePayload
    public GetClientsResponse getClients(@RequestPayload GetClientsRequest request){

        System.out.println("endpoint");

        GetClientsResponse response = new GetClientsResponse();


        System.out.println("Before get client");
        List<Client> clientList = getClientsService.getClients();
        System.out.println("after client");

        for (Client client: clientList
        ) {
            ClientInfo clientInfo = new ClientInfo();

            BeanUtils.copyProperties(client,clientInfo);

            clientInfo.setClientId(client.getId());

            response.getAllClients().add(clientInfo);
        }

        System.out.println(response.getAllClients());

        return response;

    }
}
