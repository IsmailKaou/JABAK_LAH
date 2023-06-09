//package com.example.clientwebservice.repository;
//
//import com.example.clientwebservice.model.Impaye;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public interface ImpayeRepository extends CrudRepository<Impaye,Integer> {
//
////    List<Impaye> findAllByClientAndCreance(Creance creance, Client client);
//}

package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.model.Creance;
import com.example.clientwebservice.model.Impaye;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImpayeRepository extends CrudRepository<Impaye,Integer> {

    List<Impaye> findAllByClientAndCreance(Client client, Creance creance);

    @Override
    void deleteAllById(Iterable<? extends Integer> integers);
}