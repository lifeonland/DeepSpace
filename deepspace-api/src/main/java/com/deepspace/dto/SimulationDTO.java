package com.deepspace.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SimulationDTO {
    private Long id;
    private String name;
    private String description;
    private String simulationType;
    private Long planetId;
    private Double speedMultiplier;
    private Integer duration;
    private String status;
    private String parameters;
    private String createdAt;
    private String startedAt;
    private String endedAt;
    private String updatedAt;
}
