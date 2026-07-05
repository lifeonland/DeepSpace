package com.deepspace.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public static ResourceNotFoundException planetNotFound(Long id) {
        return new ResourceNotFoundException("Planet not found with id: " + id);
    }

    public static ResourceNotFoundException planetNotFoundByName(String name) {
        return new ResourceNotFoundException("Planet not found with name: " + name);
    }

    public static ResourceNotFoundException simulationNotFound(Long id) {
        return new ResourceNotFoundException("Simulation not found with id: " + id);
    }

    public static ResourceNotFoundException quizNotFound(Long id) {
        return new ResourceNotFoundException("Quiz not found with id: " + id);
    }
}
