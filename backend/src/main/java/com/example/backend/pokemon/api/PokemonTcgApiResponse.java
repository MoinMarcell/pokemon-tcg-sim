package com.example.backend.pokemon.api;

import com.example.backend.pokemon.model.PokemonCard;
import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.With;

import java.util.List;

public record PokemonTcgApiResponse(
        @JsonAlias("data")
        List<PokemonCard> pokemonCards,
        int page,
        @With int pages,
        int pageSize,
        @JsonAlias("count")
        int cardsFound,
        @JsonAlias("totalCount")
        String totalCards
) {
}
