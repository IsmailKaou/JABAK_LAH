package com.example.clientwebservice.request;

import jakarta.xml.bind.annotation.*;
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
        "id"
})
@XmlRootElement(name = "getFormsRequest",namespace="http://example.com/creanceForm")
public class GetFormsRequest {
    @XmlElement(required = true)
    Integer id ;
    public Integer getId(){
        return this.id;
    }

}
