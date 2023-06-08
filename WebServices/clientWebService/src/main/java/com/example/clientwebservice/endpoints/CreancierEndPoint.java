package com.example.clientwebservice.endpoints;

import com.example.clientwebservice.response.GetCreanciersResponse;
import com.example.clientwebservice.service.CreancierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class CreancierEndPoint {
    private static final String NAMESPACE = "http://example.com/creanciers";

    @Autowired
    private CreancierService creancierService;

    @PayloadRoot(namespace = NAMESPACE,localPart = "getCreanciersRequest")
    @ResponsePayload
    public GetCreanciersResponse getCreanciers(){
        System.out.println("i am in the response");
        GetCreanciersResponse getCreanciersResponse=new GetCreanciersResponse();
        getCreanciersResponse.setCreanciers(creancierService.getCreanciers());

        return getCreanciersResponse;
    }
}
