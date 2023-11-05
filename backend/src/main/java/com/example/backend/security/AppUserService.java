package com.example.backend.security;

import com.example.backend.exception.NoUserLoggedInException;
import com.example.backend.exception.UsernameOrEmailAlreadyExistException;
import com.example.backend.util.Argon2Service;
import com.example.backend.util.TimeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
				emailMaskService.maskEmail(savedAppUser.getEmail()),
				savedAppUser.getRole(),
				savedAppUser.getRegistrationDate()
		);
	}

	public AppUserResponse getLoggedInAppUser() {
		var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof AppUser appUserDetails) {
			return new AppUserResponse(
					appUserDetails.getId(),
					appUserDetails.getUsername(),
					emailMaskService.maskEmail(appUserDetails.getEmail()),
					appUserDetails.getRole(),
					appUserDetails.getRegistrationDate()
			);
		}
		throw new NoUserLoggedInException("No User Logged In");
	}

	private boolean existsAppUserByEmailOrUsername(String email, String username) {
		return appUserRepository.existsAppUserByEmailOrUsername(email, username);
	}

}
