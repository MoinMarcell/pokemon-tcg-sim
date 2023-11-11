package com.example.backend.pokemon;

import com.example.backend.pokemon.api.PokemonTcgCardApiService;
import com.example.backend.pokemon.model.PokemonCard;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pokemon/cards")
@AllArgsConstructor
public class PokemonCardController {
    private final PokemonTcgCardApiService pokemonTcgCardApiService;

    @GetMapping
    public List<PokemonCard> getCardsByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "1", required = false) int page
    ) {
        if (page > 1) {
            return pokemonTcgCardApiService.fetchCardsByName(name, page);
        }
        return pokemonTcgCardApiService.fetchCardsByName(name);
    }
}
