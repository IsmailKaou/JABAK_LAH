/*package com.example.clientwebservice.config.batchprocessing;

import com.example.clientwebservice.service.batchprocessing.BatchProcessor;
import com.example.clientwebservice.service.batchprocessing.BatchReader;
import com.example.clientwebservice.service.batchprocessing.BatchWriter;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
@EnableBatchProcessing
public class BatchConfig {
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private PlatformTransactionManager transactionManager;

    @Bean
    public Job createJob() {
        return new JobBuilder("MyJob",jobRepository)
                .incrementer(new RunIdIncrementer())
                .flow(createStep()).end().build();
    }

    @Bean
    public Step createStep() {
        return new StepBuilder("MyStep",jobRepository)
                .<String, String> chunk(1,transactionManager)
                .reader(new BatchReader())
                .processor(new BatchProcessor())
                .writer(new BatchWriter())
                .build();
    }


}
*/