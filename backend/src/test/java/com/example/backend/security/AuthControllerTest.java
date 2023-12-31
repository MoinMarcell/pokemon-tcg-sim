package com.example.backend.security;

import com.example.backend.util.EmailMaskService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

	private static final String BASE_URI = "/api/v1/auth";

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private EmailMaskService emailMaskService;

	@Test
	@DirtiesContext
	void getMe_whenLoggedIn_expectStatus200() throws Exception {
		AppUser mockUser = new AppUser("id", "test", "test1234", "test@test.de", AppUserRole.USER, "registrationDate", List.of());

		AppUserResponse expectedAppUserResponse = new AppUserResponse("id", "test", emailMaskService.maskEmail(mockUser.getEmail()), AppUserRole.USER, "registrationDate", List.of());
		String expectedAppUserResponseJson = objectMapper.writeValueAsString(expectedAppUserResponse);

		mockMvc.perform(get(BASE_URI + "/me").with(user(mockUser)))
				.andExpect(status().isOk())
				.andExpect(content().json(expectedAppUserResponseJson));
	}

	@Test
	@DirtiesContext
	void getMe_whenNotLoggedIn_expectStatus401() throws Exception {
		mockMvc.perform(get(BASE_URI + "/me"))
				.andExpect(status().isUnauthorized())
				.andExpect(content().string("No User Logged In"));
	}
}
