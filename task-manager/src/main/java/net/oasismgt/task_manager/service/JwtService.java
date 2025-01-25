package net.oasismgt.task_manager.service;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Service
public class JwtService {
  @Value("${jwt.secret}")
  private String jwtSecret;

  public String issueToken(long userId, String email, List<String> roles) {
    return JWT.create()
        .withSubject(String.valueOf(userId))
        .withExpiresAt(Instant.now().plusSeconds(86400))
        .withClaim("e", email)
        .withClaim("a", roles)
        .sign(Algorithm.HMAC256(jwtSecret));
  }

  public DecodedJWT decodeToken(String token) {
    return JWT.require(Algorithm.HMAC256(jwtSecret)).build().verify(token);
  }
}
