package com.example.backend.pokemon;

import com.example.backend.pokemon.api.PokemonTcgApiResponse;
import com.example.backend.pokemon.api.PokemonTcgCardApiService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pokemon/cards")
@AllArgsConstructor
public class PokemonCardController {
    private final PokemonTcgCardApiService pokemonTcgCardApiService;

    @GetMapping
    public PokemonTcgApiResponse getCardsByName(
            @RequestParam(defaultValue = "1", required = false) int page
    ) {
        return pokemonTcgCardApiService.fetchAllCards(page);
    }
}
