package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.AdminToken;
import com.example.clientwebservice.model.AgentToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdminTokenRepository extends JpaRepository<AdminToken,Integer> {
    @Query("""
      select t from AgentToken t inner join Agent u
      on t.agent.id = u.id
      where u.id = :agentId and (t.expired = false or t.revoked = false)
      """)
    List<AdminToken> findAllValidTokensByAdmin(Integer agentId);

    Optional<AdminToken> findByToken(String token);
}
