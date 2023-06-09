package com.example.clientwebservice.service;

import com.example.clientwebservice.model.BankAccount;
import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.repository.BankRepository;
import com.example.clientwebservice.repository.ImpayeRepository;
import com.example.clientwebservice.request.PayeImpayesRequest;
import com.example.clientwebservice.response.PayeImpayesResponse;
import com.example.clientwebservice.response.VerificationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Random;

@Service
public class PayeBillsService {

    static String filePath="./payments.log";
    @Autowired
    SmsService smsService;
    @Autowired
    ImpayeRepository impayeRepository;

    @Autowired
    BankRepository bankRepository;
    public VerificationResponse verifyClient(String phone){
        VerificationResponse verificationResponse=new VerificationResponse();
        Random rnd = new Random();
        int number = rnd.nextInt(999999);

        String verificationCode=String.format("%06d", number);
        smsService.sendSMS(verificationCode,phone);
        verificationResponse.setVerificationCode(verificationCode);
        return verificationResponse;

    }

    public PayeImpayesResponse payeBills(PayeImpayesRequest request){
        PayeImpayesResponse payeImpayesResponse=new PayeImpayesResponse();
        System.out.println(request.getImpayesIds());
        System.out.println("the amount is  "+request.getAmount());

        BankAccount clientAccount=bankRepository.findByPhoneNumber(request.getPhone());
        clientAccount.setBalance(clientAccount.getBalance()-request.getAmount());
        System.out.println("the balance is "+clientAccount.getBalance());
        impayeRepository.deleteAllById(request.getImpayesIds());
        bankRepository.save(clientAccount) ;
        // Write client information
//        writeToFile(filePath, "Client Information:");
//        writeToFile(filePath, "Name: " + clientAccount.getFirstName()+" "+clientAccount.getLastName());
//
//        // Write payment details
//        writeToFile(filePath, "Payment Details:" );
//        writeToFile(filePath, "Invoice Numbers: " + request.getImpayesIds());
//        writeToFile(filePath, "Total Amount: MAD" + request.getAmount());
        payeImpayesResponse.setMessage("the impayes has been successfully deleted");
        return payeImpayesResponse;
    }
    public void writeToFile(String filePath, String data) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
