package com.example.clientwebservice.repository;

import com.example.clientwebservice.model.BankAccount;
import org.springframework.data.repository.CrudRepository;

public interface BankRepository extends CrudRepository<BankAccount, Integer> {
    BankAccount findByPhoneNumber(String phoneNumber);
}
