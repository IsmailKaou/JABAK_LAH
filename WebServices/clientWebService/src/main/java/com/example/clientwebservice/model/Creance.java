//
// Ce fichier a été généré par Eclipse Implementation of JAXB, v3.0.0 
// Voir https://eclipse-ee4j.github.io/jaxb-ri 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2023.05.10 à 09:02:18 PM WEST
//


package com.example.clientwebservice.model;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Creance", propOrder = {
        "id",
        "code",
        "name",
        "category",
//        "creanciers",
        "impayes",
        "form"


})
@Entity
@Table(name="creance")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Creance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int id;
    protected String code;
    @XmlElement(required = true)
    protected String name;
    protected String category;


//    @ManyToMany(fetch =  FetchType.EAGER)
//    protected Set<Creancier> creanciers;
    @OneToMany(fetch =  FetchType.EAGER)
    protected List<Impaye> impayes;

    @OneToOne(fetch = FetchType.EAGER)
    protected Form form;
}
