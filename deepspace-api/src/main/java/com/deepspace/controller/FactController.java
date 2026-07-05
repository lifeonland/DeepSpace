package com.deepspace.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/v1/facts")
@CrossOrigin(origins = "*")
public class FactController {

    private final List<String> facts = Arrays.asList(
        "A day on Venus is longer than a year on Venus.",
        "There are more stars in the universe than grains of sand on all the beaches on Earth.",
        "Space is completely silent.",
        "One day, the Sun will consume the Earth.",
        "The footprints on the Moon will be there for 100 million years.",
        "Neutron stars can spin 600 times per second.",
        "There is a volcano on Mars three times the size of Everest."
    );

    @GetMapping("/random")
    public String getRandomFact() {
        return facts.get(new Random().nextInt(facts.size()));
    }

    @GetMapping
    public List<String> getAllFacts() {
        return facts;
    }
}
