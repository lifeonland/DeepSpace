package com.deepspace.repository;

import com.deepspace.entity.Simulation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SimulationRepository extends JpaRepository<Simulation, Long> {
    List<Simulation> findByStatus(String status);

    List<Simulation> findByPlanetId(Long planetId);

    @Query("SELECT s FROM Simulation s WHERE s.status = :status AND s.planetId = :planetId")
    List<Simulation> findByStatusAndPlanetId(@Param("status") String status, @Param("planetId") Long planetId);

    @Query("SELECT s FROM Simulation s ORDER BY s.createdAt DESC")
    List<Simulation> findAllOrderedByCreated();
}
