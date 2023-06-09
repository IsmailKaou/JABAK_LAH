package com.example.clientwebservice.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.ws.config.annotation.EnableWs;
import org.springframework.ws.transport.http.MessageDispatcherServlet;
import org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition;
import org.springframework.xml.xsd.SimpleXsdSchema;
import org.springframework.xml.xsd.XsdSchema;

@EnableWs
@Configuration
public class WebServiceConfig {

    @Bean(name = "clientMessageDispatcher")
    public ServletRegistrationBean<MessageDispatcherServlet> messageDispatcherServlet(ApplicationContext context) {
        MessageDispatcherServlet servlet = new MessageDispatcherServlet();
        servlet.setApplicationContext(context);
        servlet.setTransformWsdlLocations(true);
        return new ServletRegistrationBean<>(servlet, "/ws/*");
    }


    @Bean(name = "clients")
    public DefaultWsdl11Definition defaultWsdl11Definition(XsdSchema schema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName("createClient");
        wsdl11Definition.setLocationUri("/ws");
        wsdl11Definition.setTargetNamespace("http://example.com/clientservice");
        wsdl11Definition.setSchema(schema);
        return wsdl11Definition;
    }


    @Bean
    public XsdSchema schema() {
        return new SimpleXsdSchema(new ClassPathResource("clientWebService.xsd"));
    }

    @Bean(name = "clientlist")
    public DefaultWsdl11Definition defaultWsdl11DefinitionList(XsdSchema ClientListSchema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName("clientlist");
        wsdl11Definition.setLocationUri("/ws");
        wsdl11Definition.setTargetNamespace("http://example.com/clientlist");
        wsdl11Definition.setSchema(ClientListSchema);
        return wsdl11Definition;
    }


    @Bean
    public XsdSchema ClientListSchema() {
        return new SimpleXsdSchema(new ClassPathResource("clientsWebService.xsd"));
    }
    @Bean(name = "creanciers")
    public DefaultWsdl11Definition creanciersWsdl11Definition(XsdSchema schema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName("ListeCreanciers");
        wsdl11Definition.setLocationUri("/ws");
        wsdl11Definition.setTargetNamespace("http://example.com/creanciers");
        wsdl11Definition.setSchema(schema);
        return wsdl11Definition;
    }

    //    @Bean
//    public XsdSchema creancierSchema(){
//        return new SimpleXsdSchema(new ClassPathResource("creancierWebService.xsd"));
//
//    }
    @Bean(name = "dynamicForm")
    public DefaultWsdl11Definition dynamicFormWsdl11Definition(XsdSchema schema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName("GetForms");
        wsdl11Definition.setLocationUri("/ws");
        wsdl11Definition.setTargetNamespace("http://example.com/creanceForm");
        wsdl11Definition.setSchema(schema);
        return wsdl11Definition;
    }
    @Bean(name = "getImpayes")
    public DefaultWsdl11Definition getImpayesWsdl11Definition( XsdSchema schema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName("GetImpayes");
        wsdl11Definition.setLocationUri("/ws");
        wsdl11Definition.setTargetNamespace("http://example.com/getImpayes");
        wsdl11Definition.setSchema(schema);
        return wsdl11Definition;
    }
    @Bean(name = "payBills")
    public DefaultWsdl11Definition payBillsWsdl11Definition(XsdSchema schema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName("PayBills");
        wsdl11Definition.setLocationUri("/ws");
        wsdl11Definition.setTargetNamespace("http://example.com/clientservice");
        wsdl11Definition.setSchema(schema);
        return wsdl11Definition;
    }
    @Bean(name = "verifyClient")
    public DefaultWsdl11Definition verifyClientWsdl11Definition(XsdSchema schema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName("VerificationResponse");
        wsdl11Definition.setLocationUri("/ws");
        wsdl11Definition.setTargetNamespace("http://example.com/getImpayes");
        wsdl11Definition.setSchema(schema);
        return wsdl11Definition;
    }


}



