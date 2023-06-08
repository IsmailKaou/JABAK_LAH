package com.example.clientwebservice.service;


import com.example.clientwebservice.AgentDetails;
import com.example.clientwebservice.CreateAgentRequest;
import com.example.clientwebservice.CreateAgentResponse;
import com.example.clientwebservice.model.Agent;
import com.example.clientwebservice.model.Role;
import com.example.clientwebservice.repository.AgentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateAgentService {
    private final AgentRepository agentRepository;
    private final RandomPasswordGenerator randomPasswordGenerator;
    private final PasswordEncoder passwordEncoder;
    private final EmailSenderService senderService;
    public CreateAgentResponse createAgent(CreateAgentRequest request){

        System.out.println("create agent service");

        CreateAgentResponse response = new CreateAgentResponse();
        AgentDetails agentDetails = request.getAgentDetails();

        if(agentRepository.findByCin(agentDetails.getCin())!=null){
            response.setIsCreated(false);
            response.setErrorMessage("this agent had already an account");
            return response;
        }

        Agent agent = new Agent();
        String password = randomPasswordGenerator.generatePassayPassword();
        System.out.println("this is the password : "+password);
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
        agent.setPassword(passwordEncoder.encode(password));
        agent.setRole(Role.UNVERIFIED_USER);

        agentRepository.save(agent);

        senderService.sendEmail(agentDetails.getEmail(),"This is your password",password);
        response.setIsCreated(true);
        response.setErrorMessage(null);
        return response;
    }

    public List<Agent> getAgents(){

        return (List<Agent>) agentRepository.findAll();
    }



    public Agent updateAgent(Agent agent ,int AgentId){

        Agent agt = agentRepository.findById(AgentId).get();
        System.out.println(agt.getId());
        agt.setFirstName(agent.getFirstName());
        agt.setLastName(agent.getLastName());
        agt.setAddresse(agent.getAddresse());


        agt.setBirthday(agent.getBirthday());


        agt.setImmatriculation(agent.getImmatriculation());
        agt.setCinPicture(agent.getCinPicture());
        agt.setCin(agent.getCin());
        agt.setLicense(agent.getLicense());
        agt.setPhone(agent.getPhone());
        agt.setEmail(agent.getEmail());

            return agentRepository.save(agt) ;
    }

    public void deleteAgent(int id){
        agentRepository.deleteById(id);
    }

}
