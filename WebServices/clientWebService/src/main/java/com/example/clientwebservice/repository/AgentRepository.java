package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.Agent;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AgentRepository extends CrudRepository<Agent, Integer> {
    Optional<Agent> findAgentByEmail(String email);
    Agent findByCin(String cin);

}