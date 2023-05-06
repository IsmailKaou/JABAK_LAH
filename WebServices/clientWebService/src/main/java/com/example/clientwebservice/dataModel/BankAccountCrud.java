package com.example.clientwebservice.dataModel;

import com.example.clientwebservice.dataModel.Client;
import org.springframework.data.repository.CrudRepository;

public interface BankAccountCrud extends CrudRepository<BankAccount, Integer> {
    BankAccount findByPhoneNumber(String phoneNumber);
}
