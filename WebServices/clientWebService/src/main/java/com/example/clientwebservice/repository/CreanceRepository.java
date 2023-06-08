package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.Creance;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreanceRepository extends CrudRepository<Creance, Integer> {

    @Override
    Iterable<Creance> findAllById(Iterable<Integer> integers);
}
