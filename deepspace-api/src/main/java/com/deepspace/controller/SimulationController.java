package com.deepspace.controller;

import com.deepspace.dto.SimulationDTO;
import com.deepspace.service.SimulationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/v1/simulations")
@Tag(name = "Simulations", description = "Simulation management API")
@Slf4j
@CrossOrigin(origins = "*")
public class SimulationController {
    private final SimulationService simulationService;

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @GetMapping
    @Operation(summary = "Get all simulations")
    public ResponseEntity<List<SimulationDTO>> getAllSimulations() {
        log.info("GET /api/v1/simulations - fetching all simulations");
        return ResponseEntity.ok(simulationService.getAllSimulations());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get simulation by ID")
    public ResponseEntity<SimulationDTO> getSimulationById(@PathVariable Long id) {
        log.info("GET /api/v1/simulations/{} - fetching simulation", id);
        return ResponseEntity.ok(simulationService.getSimulationById(id));
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get simulations by status")
    public ResponseEntity<List<SimulationDTO>> getSimulationsByStatus(@PathVariable String status) {
        log.info("GET /api/v1/simulations/status/{} - fetching simulations", status);
        return ResponseEntity.ok(simulationService.getSimulationsByStatus(status));
    }

    @GetMapping("/planet/{planetId}")
    @Operation(summary = "Get simulations for a specific planet")
    public ResponseEntity<List<SimulationDTO>> getSimulationsByPlanetId(@PathVariable Long planetId) {
        log.info("GET /api/v1/simulations/planet/{} - fetching simulations", planetId);
        return ResponseEntity.ok(simulationService.getSimulationsByPlanetId(planetId));
    }

    @PostMapping
    @Operation(summary = "Create a new simulation")
    public ResponseEntity<SimulationDTO> createSimulation(@RequestBody SimulationDTO dto) {
        log.info("POST /api/v1/simulations - creating new simulation: {}", dto.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(simulationService.createSimulation(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing simulation")
    public ResponseEntity<SimulationDTO> updateSimulation(@PathVariable Long id, @RequestBody SimulationDTO dto) {
        log.info("PUT /api/v1/simulations/{} - updating simulation", id);
        return ResponseEntity.ok(simulationService.updateSimulation(id, dto));
    }

    @PostMapping("/{id}/start")
    @Operation(summary = "Start a simulation")
    public ResponseEntity<SimulationDTO> startSimulation(@PathVariable Long id) {
        log.info("POST /api/v1/simulations/{}/start - starting simulation", id);
        return ResponseEntity.ok(simulationService.startSimulation(id));
    }

    @PostMapping("/{id}/pause")
    @Operation(summary = "Pause a simulation")
    public ResponseEntity<SimulationDTO> pauseSimulation(@PathVariable Long id) {
        log.info("POST /api/v1/simulations/{}/pause - pausing simulation", id);
        return ResponseEntity.ok(simulationService.pauseSimulation(id));
    }

    @PostMapping("/{id}/complete")
    @Operation(summary = "Complete a simulation")
    public ResponseEntity<SimulationDTO> completeSimulation(@PathVariable Long id) {
        log.info("POST /api/v1/simulations/{}/complete - completing simulation", id);
        return ResponseEntity.ok(simulationService.completeSimulation(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a simulation")
    public ResponseEntity<Void> deleteSimulation(@PathVariable Long id) {
        log.info("DELETE /api/v1/simulations/{} - deleting simulation", id);
        simulationService.deleteSimulation(id);
        return ResponseEntity.noContent().build();
    }
}
