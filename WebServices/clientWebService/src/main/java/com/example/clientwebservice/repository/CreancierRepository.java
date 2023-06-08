package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.Creancier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
@Repository
public interface CreancierRepository extends CrudRepository<Creancier, BigInteger> {
}
