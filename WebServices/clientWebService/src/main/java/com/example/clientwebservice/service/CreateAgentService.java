package com.example.clientwebservice.service;


import com.example.clientwebservice.AgentDetails;
import com.example.clientwebservice.CreateAgentRequest;
import com.example.clientwebservice.CreateAgentResponse;
import com.example.clientwebservice.model.Agent;
import com.example.clientwebservice.model.Role;
import com.example.clientwebservice.repository.AgentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateAgentService {
    private final AgentRepository agentRepository;
    private final RandomPasswordGenerator randomPasswordGenerator;
    private final PasswordEncoder passwordEncoder;
    private final EmailSenderService senderService;
    public CreateAgentResponse createAgent(CreateAgentRequest request){

        CreateAgentResponse response = new CreateAgentResponse();
        AgentDetails agentDetails = request.getAgentDetails();

        if(agentRepository.findByCin(agentDetails.getCin())!=null){
            response.setIsCreated(false);
            response.setErrorMessage("this agent had already an account");
            return response;
        }

        Agent agent = new Agent();
        String password = randomPasswordGenerator.generatePassayPassword();
        System.out.println(password);
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

//        senderService.sendEmail(agentDetails.getEmail(),"This is your password",password);
        response.setIsCreated(true);
        response.setErrorMessage(null);
        return response;
    }
}
