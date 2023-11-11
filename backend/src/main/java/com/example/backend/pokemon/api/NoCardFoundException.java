package com.example.backend.pokemon.api;

public class NoCardFoundException extends RuntimeException {
    public NoCardFoundException(String message) {
        super(message);
    }
}
