package com.example.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AppUserControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	@DirtiesContext
	void registerNewAppUser_whenUserNotInDb_expectStatus201AndReturnSavedUser() throws Exception {
		AppUserRequest appUserRequest = new AppUserRequest("test", "test1234", "test@test.de");
		String appUserRequestJson = objectMapper.writeValueAsString(appUserRequest);

		MvcResult mvcResult = mockMvc.perform(post("/api/v1/users/register")
						.contentType(MediaType.APPLICATION_JSON)
						.content(appUserRequestJson))
				.andExpect(status().isCreated())
				.andReturn();
		AppUser appUser = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), AppUser.class);

		assertEquals(appUserRequest.username(), appUser.getUsername());
		assertEquals(AppUserRole.USER, appUser.getRole());
		assertNotNull(appUser.getEmail());
		assertNotNull(appUser.getRegistrationDate());
		assertNotNull(appUser.getId());
	}

	@Test
	@DirtiesContext
	void registerNewAppUser_whenUserInDb_expectStatus400() throws Exception {
		AppUserRequest appUserRequest = new AppUserRequest("test", "test1234", "test@test.de");
		String appUserRequestJson = objectMapper.writeValueAsString(appUserRequest);

		mockMvc.perform(post("/api/v1/users/register")
						.contentType(MediaType.APPLICATION_JSON)
						.content(appUserRequestJson))
				.andExpect(status().isCreated());

		mockMvc.perform(post("/api/v1/users/register")
						.contentType(MediaType.APPLICATION_JSON)
						.content(appUserRequestJson))
				.andExpect(status().isBadRequest())
				.andExpect(content().string("Email or username already taken"));
	}
}