package com.diploma.gateway.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@Component
public class JwtReactiveUtils {

    @Autowired
    private JwtConfig jwtConfig;

    public Mono<String> extract(ServerWebExchange serverWebExchange) {
        return Mono.justOrEmpty(serverWebExchange.getRequest()
                .getHeaders()
                .getFirst(jwtConfig.getHeader()));
    }

    public Mono<JwtUser> verify(String token) {
        return Mono.justOrEmpty(token)
                .flatMap(this::parse);
    }

    public Mono<String> isolateTokenValue(String authValue) {
        return Mono.justOrEmpty(authValue.substring(jwtConfig.getPrefix().length()));
    }

    private Mono<JwtUser> parse(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(jwtConfig.getSecret().getBytes())
                    .parseClaimsJws(token)
                    .getBody();
            String username = claims.getSubject();
            List<String> authorities = (List<String>) claims.get("authorities");
            return Mono.justOrEmpty(new JwtUser(username, authorities));
        } catch (Exception e) {
            log.error("Ошибка парсинга JWT:", e);
            return Mono.empty();
        }
    }
}
