package com.example.clientwebservice.model;


import jakarta.persistence.*;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "form", propOrder = {
        "id",
        "name",
        "fields"


})
@Entity
@Table(name="form")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public  class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Field> fields;
    String name;

}
