package com.example.clientwebservice.response;

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
@XmlType(name = "", propOrder = {
        "clientExists","message"
})
@XmlRootElement(name = "getClientResponse")
public class GetClientResponse {

    Boolean clientExists;
    String message;

//    List<String> messages= Arrays.asList(new String[]{"The provided phone number does not correspond to any of our clients.","This client does not have a subscription for this debt.","This client have a subscription for this debt."});
}
