package com.example.clientwebservice.request;


import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "clientPhone", "creanceId"})
@XmlRootElement(name= "getImpayesRequest",namespace="http://example.com/getImpayes")
public class GetImpayesRequest {
//    @XmlElement(required = true)
    String clientPhone ;
    Integer creanceId;


}

