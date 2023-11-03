package com.example.backend.security;

import com.example.backend.exception.UsernameOrEmailAlreadyExistException;
import com.example.backend.util.Argon2Service;
import com.example.backend.util.TimeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AppUserService {

	private final AppUserRepository appUserRepository;
	private final Argon2Service argon2Service;
	private final TimeService timeService;


	public AppUserResponse registerNewAppUser(@NotNull @Valid AppUserRequest appUserRequest) {
		if (existsAppUserByEmailOrUsername(appUserRequest.email(), appUserRequest.username())) {
			throw new UsernameOrEmailAlreadyExistException("Email or username already taken");
		}
		AppUser savedAppUser = appUserRepository.save(
				AppUser.builder()
						.username(appUserRequest.username())
						.password(argon2Service.encode(appUserRequest.password()))
						.email(appUserRequest.email())
						.role(AppUserRole.USER)
						.registrationDate(timeService.getZonedDateTimeNow())
						.build()
		);
		return new AppUserResponse(
				savedAppUser.getId(),
				savedAppUser.getUsername(),
				savedAppUser.getEmail(),
				savedAppUser.getRole(),
				savedAppUser.getRegistrationDate()
		);
	}

	private boolean existsAppUserByEmailOrUsername(String email, String username) {
		return appUserRepository.existsAppUserByEmailOrUsername(email, username);
	}

}
