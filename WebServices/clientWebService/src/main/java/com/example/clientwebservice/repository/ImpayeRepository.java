package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.Impaye;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImpayeRepository extends CrudRepository<Impaye,Integer> {

//    List<Impaye> findAllByClientAndCreance(Creance creance, Client client);
}
