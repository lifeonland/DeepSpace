package com.deepspace.service;

import com.deepspace.dto.PlanetDTO;
import com.deepspace.entity.Planet;
import com.deepspace.exception.ResourceNotFoundException;
import com.deepspace.repository.PlanetRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class PlanetService {
    private final PlanetRepository planetRepository;

    public PlanetService(PlanetRepository planetRepository) {
        this.planetRepository = planetRepository;
    }

    public List<PlanetDTO> getAllPlanets() {
        log.info("Fetching all planets");
        return planetRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PlanetDTO getPlanetById(Long id) {
        log.info("Fetching planet with id: {}", id);
        Planet planet = planetRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.planetNotFound(id));
        return convertToDTO(planet);
    }

    public PlanetDTO getPlanetByName(String name) {
        log.info("Fetching planet with name: {}", name);
        Planet planet = planetRepository.findByName(name)
                .orElseThrow(() -> ResourceNotFoundException.planetNotFoundByName(name));
        return convertToDTO(planet);
    }

    public List<PlanetDTO> getPlanetsByType(String type) {
        log.info("Fetching planets of type: {}", type);
        return planetRepository.findByType(type).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PlanetDTO> getHabitablePlanets() {
        log.info("Fetching habitable planets");
        return planetRepository.findHabitablePlanets().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PlanetDTO> getPlanetsOrderedByDistance() {
        log.info("Fetching planets ordered by distance from sun");
        return planetRepository.findAllOrderedByDistance().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PlanetDTO> searchPlanets(String searchTerm) {
        log.info("Searching planets with term: {}", searchTerm);
        return planetRepository.searchByName(searchTerm).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PlanetDTO createPlanet(PlanetDTO dto) {
        log.info("Creating new planet: {}", dto.getName());
        
        Planet planet = Planet.builder()
                .name(dto.getName())
                .type(dto.getType())
                .size(dto.getSize())
                .distanceFromSun(dto.getDistanceFromSun())
                .surfaceTemperature(dto.getSurfaceTemperature())
                .gravity(dto.getGravity())
                .orbitalPeriod(dto.getOrbitalPeriod())
                .rotationPeriod(dto.getRotationPeriod())
                .description(dto.getDescription())
                .hasRings(dto.getHasRings() != null ? dto.getHasRings() : false)
                .moonsCount(dto.getMoonsCount() != null ? dto.getMoonsCount() : 0)
                .colorHex(dto.getColorHex())
                .isHabitable(dto.getIsHabitable() != null ? dto.getIsHabitable() : false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Planet savedPlanet = planetRepository.save(planet);
        log.info("Planet created successfully with id: {}", savedPlanet.getId());
        return convertToDTO(savedPlanet);
    }

    public PlanetDTO updatePlanet(Long id, PlanetDTO dto) {
        log.info("Updating planet with id: {}", id);
        
        Planet planet = planetRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.planetNotFound(id));

        planet.setName(dto.getName());
        planet.setType(dto.getType());
        planet.setSize(dto.getSize());
        planet.setDistanceFromSun(dto.getDistanceFromSun());
        planet.setSurfaceTemperature(dto.getSurfaceTemperature());
        planet.setGravity(dto.getGravity());
        planet.setOrbitalPeriod(dto.getOrbitalPeriod());
        planet.setRotationPeriod(dto.getRotationPeriod());
        planet.setDescription(dto.getDescription());
        planet.setHasRings(dto.getHasRings());
        planet.setMoonsCount(dto.getMoonsCount());
        planet.setColorHex(dto.getColorHex());
        planet.setIsHabitable(dto.getIsHabitable());
        planet.setUpdatedAt(LocalDateTime.now());

        Planet updatedPlanet = planetRepository.save(planet);
        log.info("Planet updated successfully");
        return convertToDTO(updatedPlanet);
    }

    public void deletePlanet(Long id) {
        log.info("Deleting planet with id: {}", id);
        
        Planet planet = planetRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.planetNotFound(id));
        
        planetRepository.delete(planet);
        log.info("Planet deleted successfully");
    }

    private PlanetDTO convertToDTO(Planet planet) {
        return PlanetDTO.builder()
                .id(planet.getId())
                .name(planet.getName())
                .type(planet.getType())
                .size(planet.getSize())
                .distanceFromSun(planet.getDistanceFromSun())
                .surfaceTemperature(planet.getSurfaceTemperature())
                .gravity(planet.getGravity())
                .orbitalPeriod(planet.getOrbitalPeriod())
                .rotationPeriod(planet.getRotationPeriod())
                .description(planet.getDescription())
                .hasRings(planet.getHasRings())
                .moonsCount(planet.getMoonsCount())
                .colorHex(planet.getColorHex())
                .isHabitable(planet.getIsHabitable())
                .createdAt(planet.getCreatedAt().toString())
                .updatedAt(planet.getUpdatedAt().toString())
                .build();
    }
}
