package com.example.clientwebservice.service;

import com.infobip.ApiClient;
import com.infobip.ApiException;
import com.infobip.api.SendSmsApi;
import com.infobip.model.SmsAdvancedTextualRequest;
import com.infobip.model.SmsDestination;
import com.infobip.model.SmsResponse;
import com.infobip.model.SmsTextualMessage;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class SmsService {

    private  final String BASE_URL = "https://89e5y9.api.infobip.com";
    private  final String API_KEY = "9de903930adde6545dab9220c58b6b12-08bfccd9-9730-4ba9-9d73-b02fc490c80e";

    private  final String SENDER = "JabekLAH";

    public void sendSMS(String message,String recipient) {
        ApiClient client = initApiClient();

        SendSmsApi sendSmsApi = new SendSmsApi(client);

        SmsTextualMessage smsMessage = new SmsTextualMessage()
                .from(SENDER)
                .addDestinationsItem(new SmsDestination().to(recipient))
                .text(message);

        SmsAdvancedTextualRequest smsMessageRequest = new SmsAdvancedTextualRequest()
                .messages(Collections.singletonList(smsMessage));

        try {
            SmsResponse smsResponse = sendSmsApi.sendSmsMessage(smsMessageRequest);
            System.out.println("Response body: " + smsResponse);
        } catch (ApiException e) {
            System.out.println("HTTP status code: " + e.getCode());
            System.out.println("Response body: " + e.getResponseBody());
        }
    }

    private ApiClient initApiClient() {
        ApiClient client = new ApiClient();

        client.setApiKeyPrefix("App");
        client.setApiKey(API_KEY);
        client.setBasePath(BASE_URL);

        return client;
    }
}
