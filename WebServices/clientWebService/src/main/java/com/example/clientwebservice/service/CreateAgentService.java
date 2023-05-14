package com.example.clientwebservice.service;


import com.example.clientwebservice.AgentDetails;
import com.example.clientwebservice.CreateAgentRequest;
import com.example.clientwebservice.CreateAgentResponse;
import com.example.clientwebservice.dataModel.Agent;
import com.example.clientwebservice.repository.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateAgentService {
    @Autowired
    private AgentRepository agentRepository;
    public CreateAgentResponse createAgent(CreateAgentRequest request){

        CreateAgentResponse response = new CreateAgentResponse();
        AgentDetails agentDetails = request.getAgentDetails();

        if(agentRepository.findByCin(agentDetails.getCin())!=null){
            response.setIsCreated(false);
            response.setErrorMessage("this agent had already an account");
            return response;
        }

        Agent agent = new Agent();


        agent.setFirstName(agentDetails.getFirstName());
        agent.setLastName(agentDetails.getLastName());
        agent.setAddresse(agentDetails.getAddresse());
        agent.setCin(agentDetails.getCin());
        agent.setBirthday(agentDetails.getBirthday());
        agent.setEmail(agentDetails.getEmail());
        agent.setPhone(agentDetails.getPhone());
        agent.setLicense(agentDetails.getLicense());
        agent.setImmatriculation(agentDetails.getImmatriculation());
        agent.setCinPicture(agentDetails.getCinPicture());

        agentRepository.save(agent);
        response.setIsCreated(true);
        response.setErrorMessage(null);
        return response;
    }
}
