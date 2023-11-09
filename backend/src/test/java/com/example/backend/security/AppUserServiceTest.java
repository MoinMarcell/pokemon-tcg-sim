package com.example.backend.security;

import com.example.backend.exception.UsernameOrEmailAlreadyExistException;
import com.example.backend.util.Argon2Service;
import com.example.backend.util.EmailMaskService;
import com.example.backend.util.TimeService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AppUserServiceTest {

	private final AppUserRepository appUserRepository = mock(AppUserRepository.class);
	private final Argon2Service argon2Service = mock(Argon2Service.class);
	private final TimeService timeService = mock(TimeService.class);
	private final EmailMaskService emailMaskService = mock(EmailMaskService.class);
	private final AppUserService appUserService = new AppUserService(appUserRepository, argon2Service, timeService, emailMaskService);

	AppUserRequest appUserRequest = new AppUserRequest("username", "password", "email");
	AppUser savedAppUser = new AppUser("id", "username", "password", "email", AppUserRole.USER, "registrationDate");
	AppUserResponse expectedAppUserResponse = new AppUserResponse("id", "username", "email", AppUserRole.USER, "registrationDate");

	@Test
	void registerNewAppUser_whenUserDoesNotExist_thenReturnNewSavedUser() {
		// when
		when(appUserRepository.existsAppUserByEmailEqualsIgnoreCaseOrUsernameEqualsIgnoreCase(appUserRequest.email(), appUserRequest.username())).thenReturn(false);
		when(appUserRepository.save(any(AppUser.class))).thenReturn(savedAppUser);
		when(timeService.getZonedDateTimeNow()).thenReturn("registrationDate");
		when(argon2Service.encode(appUserRequest.password())).thenReturn("password");
		when(emailMaskService.maskEmail(savedAppUser.getEmail())).thenReturn("email");

		AppUserResponse actualAppUserResponse = appUserService.registerNewAppUser(appUserRequest);
		// then
		verify(appUserRepository, times(1)).existsAppUserByEmailEqualsIgnoreCaseOrUsernameEqualsIgnoreCase(appUserRequest.email(), appUserRequest.username());
		verify(appUserRepository, times(1)).save(any(AppUser.class));
		verify(timeService, times(1)).getZonedDateTimeNow();
		verify(argon2Service, times(1)).encode(appUserRequest.password());
		verify(emailMaskService, times(1)).maskEmail(savedAppUser.getEmail());
		assertEquals(expectedAppUserResponse, actualAppUserResponse);
	}

	@Test
	void registerNewAppUser_whenUsernameOrEmailAlreadyExist_thenThrowUsernameOrEmailAlreadyExistException() {
		// when
		when(appUserRepository.existsAppUserByEmailEqualsIgnoreCaseOrUsernameEqualsIgnoreCase(appUserRequest.email(), appUserRequest.username())).thenReturn(true);
		// then
		assertThrows(UsernameOrEmailAlreadyExistException.class, () -> appUserService.registerNewAppUser(appUserRequest));
	}
}