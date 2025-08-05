package com.jobapplication.user_service.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.security.Key;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.Date;

public class JWTUtils {

    public static String generateJWTToken(String username, String SECRET_KEY) {
        return Jwts.builder()
                .setSubject(username)
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
                .setExpiration(Date.from(Instant.now().plus(1,ChronoUnit.HOURS)))
                .setIssuer("user-service")
                .setIssuedAt(Date.from(Instant.now()))
                .compact();
    }

}
