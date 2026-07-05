package com.deepspace.controller;

import com.deepspace.dto.SatelliteDTO;
import com.deepspace.service.SatelliteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/v1/satellites")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Satellite Tracker", description = "Endpoints for real-time satellite tracking")
@CrossOrigin(origins = "*")
public class SatelliteController {

    private final SatelliteService satelliteService;

    @GetMapping("/iss")
    @Operation(summary = "Get real-time position of the International Space Station")
    public ResponseEntity<SatelliteDTO> getIssPosition() {
        SatelliteDTO iss = satelliteService.getIssPosition();
        if (iss == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(iss);
    }
}
