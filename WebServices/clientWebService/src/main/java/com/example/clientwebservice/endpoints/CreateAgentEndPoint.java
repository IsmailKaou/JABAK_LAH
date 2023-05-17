package com.example.clientwebservice.endpoints;

import com.example.clientwebservice.CreateAgentRequest;
import com.example.clientwebservice.CreateAgentResponse;
import com.example.clientwebservice.service.CreateAgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class CreateAgentEndPoint {
    private static final String NAMESPACE = "http://example.com/agentservice";

    @Autowired
    private CreateAgentService agentService;

    @PayloadRoot(namespace = NAMESPACE,localPart = "createAgentRequest")
    @ResponsePayload
    public CreateAgentResponse getCreationStatus(@RequestPayload CreateAgentRequest request){
        return agentService.createAgent(request);
    }

}
