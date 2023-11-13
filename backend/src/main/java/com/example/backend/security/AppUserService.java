package com.example.backend.security;

import com.example.backend.exception.NoUserLoggedInException;
import com.example.backend.exception.UsernameOrEmailAlreadyExistException;
import com.example.backend.util.Argon2Service;
import com.example.backend.util.EmailMaskService;
import com.example.backend.util.TimeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final Argon2Service argon2Service;
    private final TimeService timeService;
    private final EmailMaskService emailMaskService;


    public AppUserResponse registerNewAppUser(@NotNull @Valid AppUserRequest appUserRequest) {
        if (existsAppUserByEmailOrUsername(appUserRequest.email(), appUserRequest.username())) {
            throw new UsernameOrEmailAlreadyExistException("Email or username already taken");
        }
        AppUser savedAppUser = AppUser.builder()
                .username(appUserRequest.username())
                .password(argon2Service.encode(appUserRequest.password()))
                .email(appUserRequest.email())
                .role(AppUserRole.USER)
                .registrationDate(timeService.getZonedDateTimeNow())
                .favoritePokemonCardIds(List.of())
                .build();

        return saveAppUser(savedAppUser);
    }

    public AppUserResponse getLoggedInAppUser() {
        AppUser appUser = getLoggedInUser();
        return new AppUserResponse(
                appUser.getId(),
                appUser.getUsername(),
                emailMaskService.maskEmail(appUser.getEmail()),
                appUser.getRole(),
                appUser.getRegistrationDate(),
                appUser.getFavoritePokemonCardIds()
        );
    }

    public AppUserResponse addFavoritePokemonCardId(String pokemonCardId) {
        AppUser appUser = getLoggedInUser();
        appUser.getFavoritePokemonCardIds().add(pokemonCardId);
        return saveAppUser(appUser);
    }

    public AppUserResponse deleteFavoritePokemonCardId(String pokemonCardId) {
        AppUser appUser = getLoggedInUser();
        appUser.getFavoritePokemonCardIds().remove(pokemonCardId);
        return saveAppUser(appUser);
    }

    public boolean usernameAlreadyExists(String username) {
        return appUserRepository.existsAppUserByUsernameEqualsIgnoreCase(username);
    }

    public boolean emailAlreadyExists(String email) {
        return appUserRepository.existsAppUserByEmailEqualsIgnoreCase(email);
    }

    public List<String> getFavoritePokemonCards() {
        return getLoggedInUser().getFavoritePokemonCardIds();
    }

    private AppUser getLoggedInUser() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof AppUser appUserDetails) {
            return appUserDetails;
        }
        throw new NoUserLoggedInException("No User Logged In");
    }

    private AppUserResponse saveAppUser(AppUser appUser) {
        AppUser savedAppUser = appUserRepository.save(appUser);
        return new AppUserResponse(
                savedAppUser.getId(),
                savedAppUser.getUsername(),
                emailMaskService.maskEmail(savedAppUser.getEmail()),
                savedAppUser.getRole(),
                savedAppUser.getRegistrationDate(),
                savedAppUser.getFavoritePokemonCardIds()
        );
    }

    private boolean existsAppUserByEmailOrUsername(String email, String username) {
        return appUserRepository.existsAppUserByEmailEqualsIgnoreCaseOrUsernameEqualsIgnoreCase(email, username);
    }

}
