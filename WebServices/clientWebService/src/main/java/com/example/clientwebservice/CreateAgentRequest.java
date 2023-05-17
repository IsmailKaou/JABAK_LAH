//
// Ce fichier a été généré par Eclipse Implementation of JAXB, v3.0.0 
// Voir https://eclipse-ee4j.github.io/jaxb-ri 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2023.05.17 à 11:52:17 AM WEST 
//


package com.example.clientwebservice;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java pour anonymous complex type.
 * 
 * <p>Le fragment de schéma suivant indique le contenu attendu figurant dans cette classe.
 * 
 * <pre>
 * &lt;complexType&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="agentDetails" type="{http://example.com/agentservice}agentDetails"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "agentDetails"
})
@XmlRootElement(name = "createAgentRequest")
public class CreateAgentRequest {

    @XmlElement(required = true)
    protected AgentDetails agentDetails;

    /**
     * Obtient la valeur de la propriété agentDetails.
     * 
     * @return
     *     possible object is
     *     {@link AgentDetails }
     *     
     */
    public AgentDetails getAgentDetails() {
        return agentDetails;
    }

    /**
     * Définit la valeur de la propriété agentDetails.
     * 
     * @param value
     *     allowed object is
     *     {@link AgentDetails }
     *     
     */
    public void setAgentDetails(AgentDetails value) {
        this.agentDetails = value;
    }

}
