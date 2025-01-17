package net.oasismgt.task_manager.service;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Component
public class JwtIssuer {
  @Value("${jwt.secret}")
  private String jwtSecret;

  public String issueToken(long userId, String email, List<String> roles) {
    return JWT.create()
        .withSubject(String.valueOf(userId))
        .withExpiresAt(Instant.now().plusSeconds(86400))
        .withClaim("e", email)
        .withClaim("a", roles)
        .sign(Algorithm.HMAC256(this.jwtSecret));
  }
}
