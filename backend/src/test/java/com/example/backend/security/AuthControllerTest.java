package com.example.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

	private static final String BASE_URI = "/api/v1/auth";

	@Autowired
	private MockMvc mockMvc;

	@Test
	@DirtiesContext
	@WithMockUser
	void getMe_whenLoggedIn_expectStatus200() throws Exception {
		mockMvc.perform(get(BASE_URI + "/me"))
				.andExpect(status().isOk());
	}
}
