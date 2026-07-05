package com.deepspace.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SatelliteDTO {
    private Long id;
    private String name;
    private double latitude;
    private double longitude;
    private double altitude;
    private double velocity;
    private long timestamp;
}
