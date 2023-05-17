package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.Agent;
import org.springframework.data.repository.CrudRepository;

<<<<<<< HEAD
import java.util.Optional;

public interface AgentRepository extends CrudRepository<Agent, Integer> {
    Optional<Agent> findAgentByEmail(String email);
=======
public interface AgentRepository extends CrudRepository<Agent,Integer> {
>>>>>>> 52a7f329f326a11d7f2657cf42b183b0e022070e
    Agent findByCin(String cin);
}
