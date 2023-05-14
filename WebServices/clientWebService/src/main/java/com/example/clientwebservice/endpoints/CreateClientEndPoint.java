package com.example.clientwebservice.endpoints;

import com.example.clientwebservice.CreateClientRequest;
import com.example.clientwebservice.CreateClientResponse;
import com.example.clientwebservice.service.CreateClientService;
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

}
