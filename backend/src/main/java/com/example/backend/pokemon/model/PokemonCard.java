package com.example.backend.pokemon.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PokemonCard {
    private String id;
    private String name;
    private String supertype;
    private List<String> subtypes;
    private String level;
    private String hp;
    private List<String> types;
    private List<String> rules;
    private List<PokemonAbility> abilities;
    private List<PokemonAttack> attacks;
    private List<PokemonWeakness> weaknesses;
    private List<PokemonResistance> resistances;
    private List<String> retreatCost;
    private int convertedRetreatCost;
    private String flavorText;
    private PokemonCardImage images;
}
