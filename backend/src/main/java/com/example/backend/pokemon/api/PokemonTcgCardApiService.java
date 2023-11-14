package com.example.backend.pokemon.api;

import com.example.backend.exception.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;

@Service
public class PokemonTcgCardApiService {

    @Value("${pokemontcg.api.key}")
    private String apiKey;
    private final WebClient webClient;

    public PokemonTcgCardApiService(@Value("${pokemon.api.card.url}") String url) {
        webClient = WebClient.builder().baseUrl(url).build();
    }

    public PokemonTcgApiResponse fetchAllCards(int page) {
        PokemonTcgApiResponse response = Objects.requireNonNull(webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("pageSize", 20)
                        .queryParam("page", Math.max(page, 1))
                        .build())
                .header("X-Api-Key", apiKey)
                .retrieve()
                .toEntity(PokemonTcgApiResponse.class)
                .block()).getBody();

        if (response != null) {
            if (!response.pokemonCards().isEmpty()) {
                return response.withPages((int) Math.ceil(Double.parseDouble(response.totalCards()) / response.pageSize()));
            }
            throw new NoCardFoundException("No cards found");
        }

        throw new ApiException("Something went wrong while fetching the cards");
    }
}
