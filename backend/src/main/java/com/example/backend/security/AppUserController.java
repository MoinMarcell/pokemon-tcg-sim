package com.example.backend.security;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @GetMapping("/check-user")
    @ResponseStatus(HttpStatus.OK)
    public boolean usernameOrEmailAlreadyExist(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email
    ) {
        if (username != null) {
            return appUserService.usernameAlreadyExists(username);
        } else if (email != null) {
            return appUserService.emailAlreadyExists(email);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Either username or email must be provided");
        }
    }

}
