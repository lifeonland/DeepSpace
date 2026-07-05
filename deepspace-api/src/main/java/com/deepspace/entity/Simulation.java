package com.deepspace.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "simulations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Simulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "simulation_type")
    private String simulationType;

    @Column(name = "planet_id")
    private Long planetId;

    @Column(name = "speed_multiplier")
    private Double speedMultiplier = 1.0;

    @Column(name = "duration_seconds")
    private Integer duration;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private SimulationStatus status = SimulationStatus.CREATED;

    @Column(columnDefinition = "jsonb")
    private String parameters;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();

    @Column(name = "started_at")
    private java.time.LocalDateTime startedAt;

    @Column(name = "ended_at")
    private java.time.LocalDateTime endedAt;

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt = java.time.LocalDateTime.now();

    @PreUpdate
    protected void onUpdate() {
        updatedAt = java.time.LocalDateTime.now();
    }

    public enum SimulationStatus {
        CREATED, RUNNING, PAUSED, COMPLETED, FAILED
    }
}
