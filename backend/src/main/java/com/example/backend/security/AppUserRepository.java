package com.example.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends MongoRepository<AppUser, String> {
	Optional<AppUser> findAppUserByUsername(String username);

	boolean existsAppUserByEmailEqualsIgnoreCaseOrUsernameEqualsIgnoreCase(String email, String username);

    boolean existsAppUserByUsername(String username);

    boolean existsAppUserByEmail(String email);
}
