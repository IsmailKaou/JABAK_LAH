package com.example.clientwebservice.response;


import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "clientExists","message","clientHasCreance"
})
@XmlRootElement(name = "clientHasCreanceResponse")
public class ClientHasCreanceResponse {

    Boolean clientExists;
    String message;
    Boolean clientHasCreance;
}
