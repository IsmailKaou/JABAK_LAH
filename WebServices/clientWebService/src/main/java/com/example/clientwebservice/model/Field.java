package com.example.clientwebservice.model;


import jakarta.persistence.*;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "field", propOrder = {
        "id",
        "type",
        "name"


})
@Entity
@Table(name="field")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Field {

    String type;
    String name;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
