package com.example.backend.pokemon.api;

import com.example.backend.pokemon.model.PokemonCard;

import java.util.List;

public record PokemonTcgApiResponse(
        List<PokemonCard> data,
        int page,
        int pageSize,
        int count,
        String totalCount
) {
}
