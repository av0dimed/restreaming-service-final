package com.diploma.gateway.config.auth;

import com.diploma.gateway.jwt.JwtReactiveUtils;
import com.diploma.gateway.jwt.JwtUser;
import lombok.SneakyThrows;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.stream.Collectors;

@Component
public class ServerHttpBearerAuthenticationConverter implements ServerAuthenticationConverter {

    @Autowired
    private JwtReactiveUtils jwtReactiveUtils;


    @SneakyThrows
    private Mono<Authentication> createUser(JwtUser user, ServerWebExchange exchange) {
        if (user == null || StringUtils.isEmpty(user.getUsername())) {
            return Mono.empty();
        } else {
            return Mono.justOrEmpty(new UsernamePasswordAuthenticationToken(
                    user.getUsername(),
                    null,
                    user.getAuthorities().stream()
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList())));
        }
    }

    @Override
    public Mono<Authentication> convert(ServerWebExchange exchange) {
        return Mono.justOrEmpty(exchange)
                .flatMap(jwtReactiveUtils::extract)
                .flatMap(jwtReactiveUtils::isolateTokenValue)
                .flatMap(jwtReactiveUtils::verify)
                .flatMap((user) -> createUser(user, exchange));
    }
}