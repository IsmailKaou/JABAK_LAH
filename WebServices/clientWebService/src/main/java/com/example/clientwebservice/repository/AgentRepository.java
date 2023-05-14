package com.example.clientwebservice.repository;

import com.example.clientwebservice.dataModel.Agent;
import org.springframework.data.repository.CrudRepository;

public interface AgentRepository extends CrudRepository<Agent,Integer> {
    Agent findByCin(String cin);
}
