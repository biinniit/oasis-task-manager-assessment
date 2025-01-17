package net.oasismgt.task_manager.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtDecoder {
  @Value("${jwt.secret}")
  private String jwtSecret;

  public DecodedJWT decodeToken(String token) {
    return JWT.require(Algorithm.HMAC256(this.jwtSecret)).build().verify(token);
  }
}
