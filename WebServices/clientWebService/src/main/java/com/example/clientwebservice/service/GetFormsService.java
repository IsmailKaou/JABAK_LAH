package com.example.clientwebservice.service;

import com.example.clientwebservice.model.Form;
import com.example.clientwebservice.repository.FormRepository;
import com.example.clientwebservice.request.GetFormsRequest;
import com.example.clientwebservice.response.GetFormsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetFormsService {

    @Autowired
    FormRepository formRepository;

    public GetFormsResponse getForm(GetFormsRequest getFormsRequest){
        GetFormsResponse getFormsResponse=new GetFormsResponse();
//        System.out.println(getFormsRequest.getId());
        Optional<Form> form = formRepository.findById(getFormsRequest.getId());
        if(form.isPresent()){
            Form creanceForm=form.get();
            getFormsResponse.setFields(creanceForm.getFields());
//            System.out.println("the fields of this form are "+creanceForm.getFields());
            return getFormsResponse;

        }
        else{
            return getFormsResponse;
        }
    }
}
