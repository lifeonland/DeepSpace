package com.deepspace.controller;

import com.deepspace.dto.PlanetDTO;
import com.deepspace.service.PlanetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/v1/planets")
@Tag(name = "Planets", description = "Planet management API")
@Slf4j
@CrossOrigin(origins = "*")
public class PlanetController {
    private final PlanetService planetService;

    public PlanetController(PlanetService planetService) {
        this.planetService = planetService;
    }

    @GetMapping
    @Operation(summary = "Get all planets")
    public ResponseEntity<List<PlanetDTO>> getAllPlanets() {
        log.info("GET /api/v1/planets - fetching all planets");
        return ResponseEntity.ok(planetService.getAllPlanets());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get planet by ID")
    public ResponseEntity<PlanetDTO> getPlanetById(@PathVariable Long id) {
        log.info("GET /api/v1/planets/{} - fetching planet", id);
        return ResponseEntity.ok(planetService.getPlanetById(id));
    }

    @GetMapping("/name/{name}")
    @Operation(summary = "Get planet by name")
    public ResponseEntity<PlanetDTO> getPlanetByName(@PathVariable String name) {
        log.info("GET /api/v1/planets/name/{} - fetching planet", name);
        return ResponseEntity.ok(planetService.getPlanetByName(name));
    }

    @GetMapping("/type/{type}")
    @Operation(summary = "Get planets by type")
    public ResponseEntity<List<PlanetDTO>> getPlanetsByType(@PathVariable String type) {
        log.info("GET /api/v1/planets/type/{} - fetching planets by type", type);
        return ResponseEntity.ok(planetService.getPlanetsByType(type));
    }

    @GetMapping("/habitable")
    @Operation(summary = "Get all habitable planets")
    public ResponseEntity<List<PlanetDTO>> getHabitablePlanets() {
        log.info("GET /api/v1/planets/habitable - fetching habitable planets");
        return ResponseEntity.ok(planetService.getHabitablePlanets());
    }

    @GetMapping("/distance/ordered")
    @Operation(summary = "Get planets ordered by distance from sun")
    public ResponseEntity<List<PlanetDTO>> getPlanetsOrderedByDistance() {
        log.info("GET /api/v1/planets/distance/ordered - fetching planets ordered by distance");
        return ResponseEntity.ok(planetService.getPlanetsOrderedByDistance());
    }

    @GetMapping("/search")
    @Operation(summary = "Search planets by name")
    public ResponseEntity<List<PlanetDTO>> searchPlanets(@RequestParam String q) {
        log.info("GET /api/v1/planets/search - searching planets with query: {}", q);
        return ResponseEntity.ok(planetService.searchPlanets(q));
    }

    @PostMapping
    @Operation(summary = "Create a new planet")
    public ResponseEntity<PlanetDTO> createPlanet(@RequestBody PlanetDTO dto) {
        log.info("POST /api/v1/planets - creating new planet: {}", dto.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(planetService.createPlanet(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing planet")
    public ResponseEntity<PlanetDTO> updatePlanet(@PathVariable Long id, @RequestBody PlanetDTO dto) {
        log.info("PUT /api/v1/planets/{} - updating planet", id);
        return ResponseEntity.ok(planetService.updatePlanet(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a planet")
    public ResponseEntity<Void> deletePlanet(@PathVariable Long id) {
        log.info("DELETE /api/v1/planets/{} - deleting planet", id);
        planetService.deletePlanet(id);
        return ResponseEntity.noContent().build();
    }
}
