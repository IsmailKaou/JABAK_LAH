//
// Ce fichier a été généré par Eclipse Implementation of JAXB, v3.0.0 
// Voir https://eclipse-ee4j.github.io/jaxb-ri 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2023.05.17 à 11:52:17 AM WEST 
//


package com.example.clientwebservice;

import jakarta.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.example.clientwebservice package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.example.clientwebservice
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link CreateAgentRequest }
     * 
     */
    public CreateAgentRequest createCreateAgentRequest() {
        return new CreateAgentRequest();
    }

    /**
     * Create an instance of {@link AgentDetails }
     * 
     */
    public AgentDetails createAgentDetails() {
        return new AgentDetails();
    }

    /**
     * Create an instance of {@link CreateAgentResponse }
     * 
     */
    public CreateAgentResponse createCreateAgentResponse() {
        return new CreateAgentResponse();
    }

    /**
     * Create an instance of {@link CreateClientRequest }
     * 
     */
    public CreateClientRequest createCreateClientRequest() {
        return new CreateClientRequest();
    }

    /**
     * Create an instance of {@link ClientDetails }
     * 
     */
    public ClientDetails createClientDetails() {
        return new ClientDetails();
    }

    /**
     * Create an instance of {@link CreateClientResponse }
     * 
     */
    public CreateClientResponse createCreateClientResponse() {
        return new CreateClientResponse();
    }

    /**
     * Create an instance of {@link GetClientsRequest }
     * 
     */
    public GetClientsRequest createGetClientsRequest() {
        return new GetClientsRequest();
    }

    /**
     * Create an instance of {@link GetClientsResponse }
     * 
     */
    public GetClientsResponse createGetClientsResponse() {
        return new GetClientsResponse();
    }

    /**
     * Create an instance of {@link ClientInfo }
     * 
     */
    public ClientInfo createClientInfo() {
        return new ClientInfo();
    }

}
