package com.deepspace.service;

import com.deepspace.dto.SimulationDTO;
import com.deepspace.entity.Simulation;
import com.deepspace.exception.ResourceNotFoundException;
import com.deepspace.repository.SimulationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class SimulationService {
    private final SimulationRepository simulationRepository;

    public SimulationService(SimulationRepository simulationRepository) {
        this.simulationRepository = simulationRepository;
    }

    public List<SimulationDTO> getAllSimulations() {
        log.info("Fetching all simulations");
        return simulationRepository.findAllOrderedByCreated().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SimulationDTO getSimulationById(Long id) {
        log.info("Fetching simulation with id: {}", id);
        Simulation simulation = simulationRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.simulationNotFound(id));
        return convertToDTO(simulation);
    }

    public List<SimulationDTO> getSimulationsByStatus(String status) {
        log.info("Fetching simulations with status: {}", status);
        return simulationRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SimulationDTO> getSimulationsByPlanetId(Long planetId) {
        log.info("Fetching simulations for planet: {}", planetId);
        return simulationRepository.findByPlanetId(planetId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SimulationDTO createSimulation(SimulationDTO dto) {
        log.info("Creating new simulation: {}", dto.getName());
        
        Simulation simulation = Simulation.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .simulationType(dto.getSimulationType())
                .planetId(dto.getPlanetId())
                .speedMultiplier(dto.getSpeedMultiplier() != null ? dto.getSpeedMultiplier() : 1.0)
                .duration(dto.getDuration())
                .status(Simulation.SimulationStatus.CREATED)
                .parameters(dto.getParameters())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Simulation savedSimulation = simulationRepository.save(simulation);
        log.info("Simulation created successfully with id: {}", savedSimulation.getId());
        return convertToDTO(savedSimulation);
    }

    public SimulationDTO updateSimulation(Long id, SimulationDTO dto) {
        log.info("Updating simulation with id: {}", id);
        
        Simulation simulation = simulationRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.simulationNotFound(id));

        simulation.setName(dto.getName());
        simulation.setDescription(dto.getDescription());
        simulation.setSimulationType(dto.getSimulationType());
        simulation.setSpeedMultiplier(dto.getSpeedMultiplier());
        simulation.setDuration(dto.getDuration());
        simulation.setParameters(dto.getParameters());
        simulation.setUpdatedAt(LocalDateTime.now());

        Simulation updatedSimulation = simulationRepository.save(simulation);
        log.info("Simulation updated successfully");
        return convertToDTO(updatedSimulation);
    }

    public SimulationDTO startSimulation(Long id) {
        log.info("Starting simulation with id: {}", id);
        
        Simulation simulation = simulationRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.simulationNotFound(id));

        simulation.setStatus(Simulation.SimulationStatus.RUNNING);
        simulation.setStartedAt(LocalDateTime.now());
        simulation.setUpdatedAt(LocalDateTime.now());

        Simulation updatedSimulation = simulationRepository.save(simulation);
        log.info("Simulation started successfully");
        return convertToDTO(updatedSimulation);
    }

    public SimulationDTO pauseSimulation(Long id) {
        log.info("Pausing simulation with id: {}", id);
        
        Simulation simulation = simulationRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.simulationNotFound(id));

        simulation.setStatus(Simulation.SimulationStatus.PAUSED);
        simulation.setUpdatedAt(LocalDateTime.now());

        Simulation updatedSimulation = simulationRepository.save(simulation);
        log.info("Simulation paused successfully");
        return convertToDTO(updatedSimulation);
    }

    public SimulationDTO completeSimulation(Long id) {
        log.info("Completing simulation with id: {}", id);
        
        Simulation simulation = simulationRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.simulationNotFound(id));

        simulation.setStatus(Simulation.SimulationStatus.COMPLETED);
        simulation.setEndedAt(LocalDateTime.now());
        simulation.setUpdatedAt(LocalDateTime.now());

        Simulation updatedSimulation = simulationRepository.save(simulation);
        log.info("Simulation completed successfully");
        return convertToDTO(updatedSimulation);
    }

    public void deleteSimulation(Long id) {
        log.info("Deleting simulation with id: {}", id);
        
        Simulation simulation = simulationRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.simulationNotFound(id));
        
        simulationRepository.delete(simulation);
        log.info("Simulation deleted successfully");
    }

    private SimulationDTO convertToDTO(Simulation simulation) {
        return SimulationDTO.builder()
                .id(simulation.getId())
                .name(simulation.getName())
                .description(simulation.getDescription())
                .simulationType(simulation.getSimulationType())
                .planetId(simulation.getPlanetId())
                .speedMultiplier(simulation.getSpeedMultiplier())
                .duration(simulation.getDuration())
                .status(simulation.getStatus().toString())
                .parameters(simulation.getParameters())
                .createdAt(simulation.getCreatedAt().toString())
                .startedAt(simulation.getStartedAt() != null ? simulation.getStartedAt().toString() : null)
                .endedAt(simulation.getEndedAt() != null ? simulation.getEndedAt().toString() : null)
                .updatedAt(simulation.getUpdatedAt().toString())
                .build();
    }
}
