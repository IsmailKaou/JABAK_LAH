package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.Form;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormRepository extends CrudRepository<Form, Integer> {
}
