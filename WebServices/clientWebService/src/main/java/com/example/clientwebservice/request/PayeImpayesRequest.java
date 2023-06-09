package com.example.clientwebservice.request;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "phone","amount","impayesIds"})
@XmlRootElement(name= "payeImpayesRequest",namespace="http://example.com/getImpayes")
public class PayeImpayesRequest {
    String phone;
    double amount;
    List<Integer> impayesIds;
}
