package com.example.backend.pokemon.api;

import com.example.backend.pokemon.model.PokemonCard;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Objects;

@Service
public class PokemonTcgCardApiService {

    @Value("${pokemontcg.api.key}")
    private String apiKey;
    private final WebClient webClient;

    public PokemonTcgCardApiService(@Value("${pokemon.api.card.url}") String url) {
        webClient = WebClient.builder().baseUrl(url).build();
    }

    public List<PokemonCard> fetchCardsByName(String name) {
        return fetchCardsByName(name, 1);
    }

    public List<PokemonCard> fetchCardsByName(String name, int page) {
        PokemonTcgApiResponse response = Objects.requireNonNull(webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("q", "name:" + name)
                        .queryParam("orderBy", "name")
                        .queryParam("pageSize", 20)
                        .queryParam("page", page)
                        .build())
                .header("X-Api-Key", apiKey)
                .retrieve()
                .toEntity(PokemonTcgApiResponse.class)
                .block()).getBody();
        assert response != null;
        if (!response.data().isEmpty()) {
            return response.data();
        }
        throw new NoCardFoundException("No card(s) found");
    }
}
