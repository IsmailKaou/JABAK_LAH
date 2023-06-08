//
// Ce fichier a été généré par Eclipse Implementation of JAXB, v3.0.0 
// Voir https://eclipse-ee4j.github.io/jaxb-ri 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2023.05.20 à 05:55:21 PM WEST 
//


package com.example.clientwebservice.request;

import com.example.clientwebservice.ClientDetails;
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
 *         &lt;element name="clientDetails" type="{http://example.com/clientservice}clientDetails"/&gt;
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
    "clientDetails"
})
@XmlRootElement(name = "createClientRequest", namespace = "http://example.com/clientservice")
public class CreateClientRequest {

    @XmlElement(namespace = "http://example.com/clientservice", required = true)
    protected ClientDetails clientDetails;

    /**
     * Obtient la valeur de la propriété clientDetails.
     * 
     * @return
     *     possible object is
     *     {@link ClientDetails }
     *     
     */
    public ClientDetails getClientDetails() {
        return clientDetails;
    }

    /**
     * Définit la valeur de la propriété clientDetails.
     * 
     * @param value
     *     allowed object is
     *     {@link ClientDetails }
     *     
     */
    public void setClientDetails(ClientDetails value) {
        this.clientDetails = value;
    }

}
