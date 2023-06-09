package com.example.clientwebservice.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Data
@Entity
@Table(name = "client")
public class Client implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String ceiling;
    private String emailAddress;
    private String password;
    private boolean isActive;
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "client",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<Token> tokens;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.printf(role.name());
        return List.of(new SimpleGrantedAuthority("ROLE_"+role.name()));
    }

    @Override
    public String getUsername() {
        return phoneNumber;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
    private double solde ;

    public Client(String firstName, String lastName, String phoneNumber, String emailAddress,String ceiling) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.ceiling=ceiling;
    }
//    @OneToMany(fetch =  FetchType.EAGER)
//    private List<Impaye> impayes;

    @ManyToMany(fetch =  FetchType.EAGER,cascade = CascadeType.ALL)
    private List<Creance> creances;

    public Creance getCreanceById(Integer creanceId) {
        return creances.stream()
                .filter(creance -> creance.getId()==(creanceId))
                .findFirst()
                .orElse(null);
    }

}
