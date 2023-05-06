package com.example.clientwebservice.dataModel;

import com.example.clientwebservice.dataModel.BankAccount;
import org.springframework.data.repository.CrudRepository;

public interface ClientCrud extends CrudRepository<Client,Integer> {
    Client findByPhoneNumber(String phoneNumber);
}
