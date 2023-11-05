package com.example.backend.util;

import org.springframework.stereotype.Service;

@Service
public class TimeService {
	public String getZonedDateTimeNow() {
		return java.time.ZonedDateTime.now().toString();
	}
}
