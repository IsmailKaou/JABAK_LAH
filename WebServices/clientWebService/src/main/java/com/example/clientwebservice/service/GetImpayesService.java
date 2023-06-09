//package com.example.clientwebservice.service;
//
//import com.example.clientwebservice.model.Client;
//import com.example.clientwebservice.model.Creance;
//import com.example.clientwebservice.repository.ClientRepository;
//import com.example.clientwebservice.repository.CreanceRepository;
//import com.example.clientwebservice.repository.ImpayeRepository;
//import com.example.clientwebservice.request.GetImpayesRequest;
//import com.example.clientwebservice.response.GetImpayesResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class GetImpayesService {
//
//    @Autowired
//    ImpayeRepository impayeRepository;
//    @Autowired
//    ClientRepository clientRepository;
//    @Autowired
//    CreanceRepository creanceRepository;
//
//    public GetImpayesResponse getImpayes(GetImpayesRequest getImpayesRequest){
//
//        GetImpayesResponse getImpayesResponse=new GetImpayesResponse();
//        Optional<Client> client=clientRepository.findByPhoneNumber(getImpayesRequest.getClientPhone());
//        if(client.isPresent()){
//            Creance creance=client.get().getCreanceById(getImpayesRequest.getCreanceId());
////        getImpayesResponse.setImpayes(impayeRepository.findAllByClientAndCreance(client.get(),creance.get()));
//            if(creance!=null){
//                getImpayesResponse.setImpayes(creance.getImpayes());
//            }
//        }
//
//
//        return getImpayesResponse;
//
//    }
//
//}

//package com.example.clientwebservice.service;
//
//import com.example.clientwebservice.model.Client;
//import com.example.clientwebservice.model.Creance;
//import com.example.clientwebservice.repository.ClientRepository;
//import com.example.clientwebservice.repository.CreanceRepository;
//import com.example.clientwebservice.repository.ImpayeRepository;
//import com.example.clientwebservice.request.GetImpayesRequest;
//import com.example.clientwebservice.response.GetImpayesResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class GetImpayesService {
//
//    @Autowired
//    ImpayeRepository impayeRepository;
//    @Autowired
//    ClientRepository clientRepository;
//    @Autowired
//    CreanceRepository creanceRepository;
//
//    public GetImpayesResponse getImpayes(GetImpayesRequest getImpayesRequest){
//
//        GetImpayesResponse getImpayesResponse=new GetImpayesResponse();
//        Optional<Client> client=clientRepository.findByPhoneNumber(getImpayesRequest.getClientPhone());
//        if(client.isPresent()){
//            Creance creance=client.get().getCreanceById(getImpayesRequest.getCreanceId());
//            System.out.println("i am in getImpayes");
////        getImpayesResponse.setImpayes(impayeRepository.findAllByClientAndCreance(client.get(),creance.get()));
//            if(creance!=null){
//                System.out.println("the creance is not null");
//                //    System.out.println(impayeRepository.findAllByClientAndCreance(creance,client.get()));
//                getImpayesResponse.setImpayes(impayeRepository.findAllByClientAndCreance(client.get(),creance));
//            }
//        }
//
//
//        return getImpayesResponse;
//
//    }
//
//}

package com.example.clientwebservice.service;

import com.example.clientwebservice.model.Client;
import com.example.clientwebservice.model.Creance;
import com.example.clientwebservice.repository.ClientRepository;
import com.example.clientwebservice.repository.CreanceRepository;
import com.example.clientwebservice.repository.ImpayeRepository;
import com.example.clientwebservice.request.GetImpayesRequest;
import com.example.clientwebservice.response.GetImpayesResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetImpayesService {

    @Autowired
    ImpayeRepository impayeRepository;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    CreanceRepository creanceRepository;

    public GetImpayesResponse getImpayes(GetImpayesRequest getImpayesRequest){

        GetImpayesResponse getImpayesResponse=new GetImpayesResponse();
        Optional<Client> client=clientRepository.findByPhoneNumber(getImpayesRequest.getClientPhone());
        if(client.isPresent()){
            Creance creance=client.get().getCreanceById(getImpayesRequest.getCreanceId());
            System.out.println("i am in getImpayes");
//        getImpayesResponse.setImpayes(impayeRepository.findAllByClientAndCreance(client.get(),creance.get()));
            if(creance!=null){
                System.out.println("the creance is not null");
                //    System.out.println(impayeRepository.findAllByClientAndCreance(creance,client.get()));
                getImpayesResponse.setImpayes(impayeRepository.findAllByClientAndCreance(client.get(),creance));
            }
        }


        return getImpayesResponse;
    }

}
