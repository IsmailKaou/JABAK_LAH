package com.example.clientwebservice.endpoints;
import com.example.clientwebservice.request.GetFormsRequest;
import com.example.clientwebservice.response.GetFormsResponse;
import com.example.clientwebservice.service.GetFormsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class GetFormsEndPoint {

    private static final String NAMESPACE = "http://example.com/creanceForm";

    @Autowired
    private GetFormsService service;
    @Autowired
    public GetFormsEndPoint(GetFormsService service) {
        this.service = service;
    }

    @PayloadRoot(namespace = NAMESPACE,localPart = "getFormsRequest")
    @ResponsePayload
    public GetFormsResponse getForms(@RequestPayload GetFormsRequest request){
//        System.out.println(request);
//        System.out.println("i am in form endpoint "+request.getId());
        request.setId(request.getId());

        return service.getForm(request);
    }

}
