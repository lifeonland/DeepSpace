package com.deepspace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling // Added for scheduling capabilities
public class DeepSpaceApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(DeepSpaceApiApplication.class, args);
    }

}
