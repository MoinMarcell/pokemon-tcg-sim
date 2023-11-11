package com.example.backend.security;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppUserResponse registerNewAppUser(@Valid @RequestBody AppUserRequest appUserRequest) {
        return appUserService.registerNewAppUser(appUserRequest);
    }

    @PatchMapping("/add-favorite/{cardId}")
    @ResponseStatus(HttpStatus.OK)
    public AppUserResponse addFavoritePokemonCard(@PathVariable String cardId) {
        return appUserService.addFavoritePokemonCardId(cardId);
    }

    @PatchMapping("/remove-favorite/{cardId}")
    @ResponseStatus(HttpStatus.OK)
    public AppUserResponse removeFavoritePokemonCard(@PathVariable String cardId) {
        return appUserService.deleteFavoritePokemonCardId(cardId);
    }

    @GetMapping("/favorites")
    @ResponseStatus(HttpStatus.OK)
    public List<String> getFavoritePokemonCards() {
        return appUserService.getFavoritePokemonCards();
    }

}
