package com.deepspace.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "planets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Planet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(name = "size_km")
    private Integer size;

    @Column(name = "distance_from_sun_km")
    private Long distanceFromSun;

    @Column(name = "surface_temperature_celsius")
    private Integer surfaceTemperature;

    @Column(name = "gravity_ms2")
    private Double gravity;

    @Column(name = "orbital_period_days")
    private Integer orbitalPeriod;

    @Column(name = "rotation_period_hours")
    private Integer rotationPeriod;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "has_rings")
    private Boolean hasRings = false;

    @Column(name = "moons_count")
    private Integer moonsCount = 0;

    @Column(name = "color_hex")
    private String colorHex;

    @Column(name = "is_habitable")
    private Boolean isHabitable = false;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt = java.time.LocalDateTime.now();

    @PreUpdate
    protected void onUpdate() {
        updatedAt = java.time.LocalDateTime.now();
    }
}
