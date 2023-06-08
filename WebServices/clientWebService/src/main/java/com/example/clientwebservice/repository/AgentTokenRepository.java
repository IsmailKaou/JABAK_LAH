package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.AgentToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AgentTokenRepository extends JpaRepository<AgentToken,Integer> {

    // extracts all the valid tokens belonging to this agent
    @Query("""
      select t from AgentToken t inner join Agent u
      on t.agent.id = u.id
      where u.id = :agentId and (t.expired = false or t.revoked = false)
      """)
    List<AgentToken> findAllValidTokensByAgent(Integer agentId);

    Optional<AgentToken> findByToken(String token);

}
