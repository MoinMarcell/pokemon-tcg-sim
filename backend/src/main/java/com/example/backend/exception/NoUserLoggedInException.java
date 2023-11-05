package com.example.backend.exception;

public class NoUserLoggedInException extends RuntimeException {
	public NoUserLoggedInException(String message) {
		super(message);
	}
}
