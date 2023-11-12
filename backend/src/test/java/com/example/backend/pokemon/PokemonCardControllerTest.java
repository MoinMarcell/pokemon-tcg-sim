package com.example.backend.pokemon;

import com.example.backend.pokemon.api.PokemonTcgApiResponse;
import com.example.backend.pokemon.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PokemonCardControllerTest {

    public static final String API_V_1_POKEMON_CARDS = "/api/v1/pokemon/cards";
    private static MockWebServer mockWebServer;

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeAll
    static void init() throws IOException {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
    }

    @AfterAll
    static void tearDown() throws IOException {
        mockWebServer.shutdown();
    }

    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("pokemon.api.card.url", () -> mockWebServer.url("/").toString());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getCardsByName_CalledWithoutPageParam_expectStatus200AndApiResponse() throws Exception {
        PokemonTcgApiResponse response = new PokemonTcgApiResponse(
                List.of(
                        new PokemonCard(
                                "id",
                                "name",
                                "supertype",
                                List.of("subtype1", "subtype2"),
                                "level",
                                "hp",
                                List.of("types"),
                                List.of("rules"),
                                List.of(new PokemonAbility("abilityName", "abilityText", "abilityType")),
                                List.of(new PokemonAttack("attackName", List.of("costs"), "convertedEnergyCost", "attackDamage", "attackText")),
                                List.of(new PokemonWeakness("weaknessType", "weaknessValue")),
                                List.of(new PokemonResistance("resistanceType", "resistanceValue")),
                                List.of("retreatCost"),
                                1,
                                "flavorText",
                                new PokemonCardImage("imageUrl", "imageUrlHiRes")
                        )
                ),
                1,
                10,
                20,
                20,
                "200"
        );
        String responseAsJson = objectMapper.writeValueAsString(response);

        MockResponse mockResponse = new MockResponse();
        mockResponse.setBody(responseAsJson);
        mockResponse.addHeader("Content-Type", "application/json");

        mockWebServer.enqueue(mockResponse);

        mockMvc.perform(get(API_V_1_POKEMON_CARDS))
                .andExpect(status().isOk())
                .andExpect(content().json(responseAsJson));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getCardsByName_whenResponseIsNotNullAndDataIsEmpty_expectStatus400AndErrorMessage() throws Exception {
        PokemonTcgApiResponse response = new PokemonTcgApiResponse(
                List.of(),
                1,
                10,
                20,
                20,
                "200"
        );
        String responseAsJson = objectMapper.writeValueAsString(response);

        MockResponse mockResponse = new MockResponse();
        mockResponse.setBody(responseAsJson);
        mockResponse.addHeader("Content-Type", "application/json");

        mockWebServer.enqueue(mockResponse);

        mockMvc.perform(get(API_V_1_POKEMON_CARDS))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No cards found"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getCardsByName_whenResponseIsNull_expectStatus502AndErrorMessage() throws Exception {
        String responseAsJson = objectMapper.writeValueAsString(null);

        MockResponse mockResponse = new MockResponse();
        mockResponse.setBody(responseAsJson);
        mockResponse.addHeader("Content-Type", "application/json");

        mockWebServer.enqueue(mockResponse);

        mockMvc.perform(get(API_V_1_POKEMON_CARDS))
                .andExpect(status().isBadGateway())
                .andExpect(content().string("Something went wrong while fetching the cards"));
    }

    @Test
    @DirtiesContext
    void getCardsByName_whenNotLoggedIn_expectStatus401() throws Exception {
        mockMvc.perform(get(API_V_1_POKEMON_CARDS))
                .andExpect(status().isUnauthorized());
    }
}