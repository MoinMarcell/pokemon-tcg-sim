package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(UsernameOrEmailAlreadyExistException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public String handleUsernameOrEmailAlreadyExistException(UsernameOrEmailAlreadyExistException exception) {
		return exception.getMessage();
	}

	@ExceptionHandler(NoUserLoggedInException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public String handleNoUserLoggedInException(NoUserLoggedInException exception) {
		return exception.getMessage();
	}

	@ExceptionHandler(BindException.class)
	public ResponseEntity<Map<String, String>> handleBindException(BindException exception) {
		Map<String, String> body = new HashMap<>();
		exception.getBindingResult().getAllErrors().forEach(error -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			body.put(fieldName, errorMessage);
		});
		return ResponseEntity.badRequest().body(body);
	}

}
