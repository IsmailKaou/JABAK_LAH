//
// Ce fichier a été généré par Eclipse Implementation of JAXB, v3.0.0 
// Voir https://eclipse-ee4j.github.io/jaxb-ri 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2023.05.10 à 09:02:18 PM WEST
//


package com.example.clientwebservice.model;

import java.awt.*;
import java.math.BigInteger;
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
@XmlType(name = "Creancier", propOrder = {
        "id",
        "code",
        "name",
        "image",
        "category",
        "creances"
})
@Entity
@Table(name="creancier")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Creancier {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    protected int id;
    protected String code;
    @XmlElement(required = true)
    protected String name;
    protected String image;
    protected String category;
    @ManyToMany(fetch =  FetchType.EAGER)
////   @JoinTable(
////            name = "creancier_creance",
////            joinColumns = @JoinColumn(name = "creancier_code"),
////            inverseJoinColumns = @JoinColumn(name = "creance_code")
////    )
    protected Set<Creance> creances;




}
