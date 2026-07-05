package com.deepspace.service;

import com.deepspace.dto.SatelliteDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.scheduling.annotation.Scheduled;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class SatelliteService {

    private final RestTemplate restTemplate;
    private final Map<String, SatelliteDTO> cache = new ConcurrentHashMap<>();
    
    private static final String ISS_API_URL = "https://api.wheretheiss.at/v1/satellites/25544";

    @Scheduled(fixedRate = 3000)
    public void updateIssCache() {
        try {
            log.debug("Background update of ISS position...");
            Map<String, Object> response = restTemplate.getForObject(ISS_API_URL, Map.class);
            if (response != null) {
                SatelliteDTO dto = SatelliteDTO.builder()
                        .id(25544L)
                        .name("ISS")
                        .latitude(Double.parseDouble(response.get("latitude").toString()))
                        .longitude(Double.parseDouble(response.get("longitude").toString()))
                        .altitude(Double.parseDouble(response.get("altitude").toString()))
                        .velocity(Double.parseDouble(response.get("velocity").toString()))
                        .timestamp(Long.parseLong(response.get("timestamp").toString()))
                        .build();
                
                cache.put("ISS", dto);
            }
        } catch (Exception e) {
            log.error("Background ISS update failed: {}", e.getMessage());
        }
    }

    public SatelliteDTO getIssPosition() {
        SatelliteDTO cached = cache.get("ISS");
        if (cached == null) {
            // If cache is empty (e.g. just started), do a sync fetch
            updateIssCache();
            return cache.get("ISS");
        }
        return cached;
    }
}
