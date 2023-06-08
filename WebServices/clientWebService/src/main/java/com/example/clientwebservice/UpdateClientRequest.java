//
// Ce fichier a été généré par Eclipse Implementation of JAXB, v3.0.0 
// Voir https://eclipse-ee4j.github.io/jaxb-ri 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2023.06.08 à 07:18:04 AM WEST 
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
 *         &lt;element name="clientId" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="clientInfo" type="{http://example.com/clientservice}clientDetails"/&gt;
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
    "clientId",
    "clientInfo"
})
@XmlRootElement(name = "updateClientRequest", namespace = "http://example.com/clientservice")
public class UpdateClientRequest {

    @XmlElement(namespace = "http://example.com/clientservice")
    protected int clientId;
    @XmlElement(namespace = "http://example.com/clientservice", required = true)
    protected ClientDetails clientInfo;

    /**
     * Obtient la valeur de la propriété clientId.
     * 
     */
    public int getClientId() {
        return clientId;
    }

    /**
     * Définit la valeur de la propriété clientId.
     * 
     */
    public void setClientId(int value) {
        this.clientId = value;
    }

    /**
     * Obtient la valeur de la propriété clientInfo.
     * 
     * @return
     *     possible object is
     *     {@link ClientDetails }
     *     
     */
    public ClientDetails getClientInfo() {
        return clientInfo;
    }

    /**
     * Définit la valeur de la propriété clientInfo.
     * 
     * @param value
     *     allowed object is
     *     {@link ClientDetails }
     *     
     */
    public void setClientInfo(ClientDetails value) {
        this.clientInfo = value;
    }

}
