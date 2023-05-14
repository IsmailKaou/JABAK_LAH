package com.example.clientwebservice.config;

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

public class AgentWebServiceConfig {
    @Bean
    public ServletRegistrationBean<MessageDispatcherServlet> agentMessageDispatcherServlet(ApplicationContext context){
        MessageDispatcherServlet servlet = new MessageDispatcherServlet();
        servlet.setApplicationContext(context);
        servlet.setTransformWsdlLocations(true);
        return  new ServletRegistrationBean<>(servlet,"/ws/*");
    }

    @Bean(name = "agents")
    public DefaultWsdl11Definition agentWsdl11Definition(XsdSchema schema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName("Agent");
        wsdl11Definition.setLocationUri("/agentws");
        wsdl11Definition.setTargetNamespace("http://example.com/agentservice");
        wsdl11Definition.setSchema(schema);
        return wsdl11Definition;
    }

    @Bean
    public XsdSchema agentschema(){
        return new SimpleXsdSchema(new ClassPathResource("agentWebService.xsd"));
    }


}
