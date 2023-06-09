//package com.example.clientwebservice.endpoints;
//
//import com.example.clientwebservice.request.GetImpayesRequest;
//import com.example.clientwebservice.response.GetImpayesResponse;
//import com.example.clientwebservice.service.GetImpayesService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.ws.server.endpoint.annotation.Endpoint;
//import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
//import org.springframework.ws.server.endpoint.annotation.RequestPayload;
//import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
//
//@Endpoint
//public class GetImpayesEndPoint {
//    private static final String NAMESPACE = "http://example.com/getImpayes";
//
//    @Autowired
//    private GetImpayesService service;
//    @Autowired
//    public GetImpayesEndPoint(GetImpayesService service) {
//        this.service = service;
//    }
//
//    @PayloadRoot(namespace = NAMESPACE,localPart = "getImpayesRequest")
//    @ResponsePayload
//    public GetImpayesResponse getImpayes(@RequestPayload GetImpayesRequest request){
////        System.out.println(request);
////        System.out.println("i am in form endpoint "+request.getId());
//        // request.setId(request.getId());
//
//        return service.getImpayes(request);
//    }
//}

package com.example.clientwebservice.endpoints;

import com.example.clientwebservice.request.GetImpayesRequest;
import com.example.clientwebservice.request.PayeImpayesRequest;
import com.example.clientwebservice.request.VerificationRequest;
import com.example.clientwebservice.response.GetImpayesResponse;
import com.example.clientwebservice.response.PayeImpayesResponse;
import com.example.clientwebservice.response.VerificationResponse;
import com.example.clientwebservice.service.GetImpayesService;
import com.example.clientwebservice.service.PayeBillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class GetImpayesEndPoint {
    private static final String NAMESPACE = "http://example.com/getImpayes";

    @Autowired
    private GetImpayesService service;
    @Autowired
    PayeBillsService billsService;
    @Autowired
    public GetImpayesEndPoint(GetImpayesService service) {
        this.service = service;
    }

    @PayloadRoot(namespace = NAMESPACE,localPart = "getImpayesRequest")
    @ResponsePayload
    public GetImpayesResponse getImpayes(@RequestPayload GetImpayesRequest request){
//        System.out.println(request);
//        System.out.println("i am in form endpoint "+request.getId());
        // request.setId(request.getId());

        return service.getImpayes(request);
    }

    @PayloadRoot(namespace = NAMESPACE,localPart = "verifyPhoneRequest")
    @ResponsePayload
    public VerificationResponse verifyClient(@RequestPayload VerificationRequest request){
//        System.out.println(request);
//        System.out.println("i am in form endpoint "+request.getId());
        // request.setId(request.getId());

        return billsService.verifyClient(request.getPhone());
    }

    @PayloadRoot(namespace = NAMESPACE,localPart = "payeImpayesRequest")
    @ResponsePayload
    public PayeImpayesResponse payeBills(@RequestPayload PayeImpayesRequest request){
        System.out.println("i am in paye bills ");
        return billsService.payeBills(request);
    }
}
