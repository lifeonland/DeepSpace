package com.deepspace.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanetDTO {
    private Long id;
    private String name;
    private String type;
    private Integer size;
    private Long distanceFromSun;
    private Integer surfaceTemperature;
    private Double gravity;
    private Integer orbitalPeriod;
    private Integer rotationPeriod;
    private String description;
    private Boolean hasRings;
    private Integer moonsCount;
    private String colorHex;
    private Boolean isHabitable;
    private String createdAt;
    private String updatedAt;
}
