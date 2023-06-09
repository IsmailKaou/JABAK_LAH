//package com.example.clientwebservice.model;
//
//import jakarta.persistence.*;
//import jakarta.xml.bind.annotation.XmlAccessType;
//import jakarta.xml.bind.annotation.XmlAccessorType;
//import jakarta.xml.bind.annotation.XmlRootElement;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Table(name="impaye")
//@Setter
//@Getter
//@AllArgsConstructor
//@NoArgsConstructor
//@XmlAccessorType(XmlAccessType.FIELD)
//@XmlRootElement
//public class Impaye {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String name;
//    private double amount;
//    private String type;
////    @ManyToOne(fetch =  FetchType.EAGER)
//////    @JoinColumn(name = "creancier_id")
////    private Creance creance;
////    @ManyToOne(fetch =  FetchType.EAGER)
////    @JoinColumn(name = "client_id")
////    private Client client;
//
//}

// version

package com.example.clientwebservice.model;

import jakarta.persistence.*;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="impaye")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement
public class Impaye {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double amount;
    private String type;

    @ManyToOne
    private Client client;
    @ManyToOne
    private Creance creance;
//    @ManyToOne(fetch =  FetchType.EAGER)
////    @JoinColumn(name = "creancier_id")
//    private Creance creance;
//    @ManyToOne(fetch =  FetchType.EAGER)
//    @JoinColumn(name = "client_id")
//    private Client client;

}