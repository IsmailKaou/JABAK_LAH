/*package com.example.clientwebservice.service.batchprocessing;

import java.util.List;

import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;

public class BatchWriter implements ItemWriter<String> {


    @Override
    public void write(Chunk<? extends String> chunk) throws Exception {
        for (String data : chunk) {
            System.out.println("MyCustomWriter    : Writing data    : " + data);
        }
        System.out.println("MyCustomWriter    : Writing data    : completed");
    }
}
*/