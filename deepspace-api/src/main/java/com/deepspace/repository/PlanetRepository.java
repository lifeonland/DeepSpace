package com.deepspace.repository;

import com.deepspace.entity.Planet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanetRepository extends JpaRepository<Planet, Long> {
    Optional<Planet> findByName(String name);

    List<Planet> findByType(String type);

    @Query("SELECT p FROM Planet p WHERE p.isHabitable = true")
    List<Planet> findHabitablePlanets();

    @Query("SELECT p FROM Planet p WHERE p.size > :minSize ORDER BY p.size DESC")
    List<Planet> findLargerThan(@Param("minSize") Integer minSize);

    @Query("SELECT p FROM Planet p ORDER BY p.distanceFromSun ASC")
    List<Planet> findAllOrderedByDistance();

    @Query(value = "SELECT * FROM planets WHERE name ILIKE %:searchTerm%", nativeQuery = true)
    List<Planet> searchByName(@Param("searchTerm") String searchTerm);
}
