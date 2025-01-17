package net.oasismgt.task_manager.util;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.model.auth.UserPrincipalAuthenticationToken;
import net.oasismgt.task_manager.service.JwtDecoder;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final JwtDecoder jwtDecoder;
  private final JwtToPrincipalConverter jwtToPrincipalConverter;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    extractTokenFromRequest(request)
        .map(this.jwtDecoder::decodeToken)
        .map(this.jwtToPrincipalConverter::convert)
        .map(UserPrincipalAuthenticationToken::new)
        .ifPresent(authentication -> SecurityContextHolder.getContext().setAuthentication(authentication));
    filterChain.doFilter(request, response);
  }

  private Optional<String> extractTokenFromRequest(HttpServletRequest request) {
    String token = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
      return Optional.of(token.substring(7));
    }
    return Optional.empty();
  }
}
