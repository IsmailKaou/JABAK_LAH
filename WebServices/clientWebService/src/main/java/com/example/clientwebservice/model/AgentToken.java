package com.example.clientwebservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class AgentToken {
    @Id
    @GeneratedValue
    private int id;

    private String token;
    @Enumerated(EnumType.STRING)
    private TokenType tokenType;

    private boolean expired;

    // flag to revoke all tokens
    private boolean revoked;

    @ManyToOne
    @JoinColumn(name="agent_id")
    private Agent agent;
}
