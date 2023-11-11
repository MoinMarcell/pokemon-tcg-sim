package com.example.backend.pokemon.model;

import java.util.List;

public record PokemonAttack(String name, List<String> cost, String convertedEnergyCost, String damage, String text) {
}
