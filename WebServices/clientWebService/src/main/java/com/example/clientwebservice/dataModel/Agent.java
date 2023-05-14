package com.example.clientwebservice.dataModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.datatype.XMLGregorianCalendar;
import java.util.Date;
import java.util.GregorianCalendar;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "agents")
public class Agent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String firstName;
    private String lastName;
    private String cin;
    private Date birthday ;
    private String addresse;
    private String email;
    private String phone;
    private String immatriculation;
    private String license;
    private String cinPicture;

    public void setBirthday(XMLGregorianCalendar xmlDate) {
        GregorianCalendar calendar = xmlDate.toGregorianCalendar();

        this.birthday = calendar.getTime();
    }

}
