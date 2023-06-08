package com.example.clientwebservice.endpoints;

import com.example.clientwebservice.*;
import com.example.clientwebservice.model.Agent;
import com.example.clientwebservice.service.CreateAgentService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import java.lang.reflect.InvocationTargetException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Endpoint
public class CreateAgentEndPoint {
    private static final String NAMESPACE = "http://example.com/agentservice";

    @Autowired
    private CreateAgentService agentService;

    @PayloadRoot(namespace = NAMESPACE,localPart = "createAgentRequest")
    @ResponsePayload
    public CreateAgentResponse getCreationStatus(@RequestPayload CreateAgentRequest request){
        System.out.println("create agent endpoint");
        return agentService.createAgent(request);
    }


    @PayloadRoot(namespace = NAMESPACE , localPart = "getAgentsRequest")
    @ResponsePayload
    public GetAgentsResponse getAgents(@RequestPayload GetAgentsRequest request){

        System.out.println("endpoint");

        GetAgentsResponse response = new GetAgentsResponse();


        List<Agent> agents = agentService.getAgents();

        for (Agent agent: agents
        ) {
            AgentInfo agentDetails = new AgentInfo();

            BeanUtils.copyProperties(agent,agentDetails);
            System.out.println(agent.getBirthday().getClass().getName());
            Date date = agent.getBirthday();
            System.out.println(date);
            System.out.println("hello date " +date);
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String strDate = dateFormat.format(date);
            agentDetails.setBirthday(strDate);
            System.out.println(strDate);
            agentDetails.setAgentId((agent.getId()));
            response.getAllAgents().add(agentDetails);
        }

        return response;

    }

    @PayloadRoot(namespace = NAMESPACE , localPart = "updateAgentRequest")
    @ResponsePayload
    public UpdateAgentResponse updateAgent(@RequestPayload UpdateAgentRequest request) throws InvocationTargetException, IllegalAccessException, ParseException {
        System.out.println("update endpoint");

        Agent agent = new Agent();
       UpdateAgentResponse response = new UpdateAgentResponse();
        AgentInfo agentInfo = request.getAgentInfo();



        BeanUtils.copyProperties(agentInfo,agent);
        String sDate1=agentInfo.getBirthday();
        System.out.println(sDate1);
        Date date1=new SimpleDateFormat("yyyy-MM-dd").parse(sDate1);
        System.out.println(date1.getDate());
        agentInfo.getAgentId();
        System.out.println((agentInfo.getBirthday().getClass().getName()));
        //agent.setBirthday();
        System.out.println("udate date"+agentInfo.getBirthday());
        agent.setBirthday(date1);

        System.out.println("agent birthday "+agent.getBirthday());
        if(agentService.updateAgent(agent,agentInfo.getAgentId()) != null){
            response.setIsUpdated(true);
        }else{
            response.setErrorMessage("update not done");
        }
        return response;
    }


    @PayloadRoot(namespace = NAMESPACE , localPart = "deleteAgentRequest")
    @ResponsePayload
    public DeleteAgentResponse deleteAgent(@RequestPayload DeleteAgentRequest request){

        DeleteAgentResponse response = new DeleteAgentResponse();
        agentService.deleteAgent(request.getId());
        return response;
    }


}
