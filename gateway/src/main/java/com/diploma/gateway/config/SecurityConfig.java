package com.diploma.gateway.config;

import com.diploma.gateway.config.auth.BearerTokenReactiveAuthenticationManager;
import com.diploma.gateway.config.auth.ServerHttpBearerAuthenticationConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;

import java.security.Principal;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Autowired
    private ServerHttpBearerAuthenticationConverter serverHttpBearerAuthenticationConverter;

    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .logout().disable()
                .addFilterAfter(bearerAuthenticationFilter(), SecurityWebFiltersOrder.AUTHENTICATION)
                .authorizeExchange()
                .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // Auth
                .pathMatchers("/auth/login", "/auth/register").permitAll()
                .pathMatchers("/auth/changePassword").authenticated()
                // Admin & Manager
                .pathMatchers("/admin/**").hasRole("ADMIN")
                .pathMatchers("/manager/**").hasRole("MANAGER")
                // Stream
                .pathMatchers("/stream/api/getParams", "/stream/api/getAllStreamers", "/stream/ws/**").permitAll()
                .pathMatchers("/stream/api/getSubscribedStreamers", "/stream/api/subscribe", "/stream/api/unsubscribe").authenticated()
                .pathMatchers("/stream/api/getFullParams", "/stream/api/updateParams").hasRole("STREAMER")
                .pathMatchers("/**").permitAll()
                .anyExchange().denyAll();
        return http.build();
    }

    private AuthenticationWebFilter bearerAuthenticationFilter() {
        AuthenticationWebFilter bearerAuthenticationFilter;
        ReactiveAuthenticationManager authManager;

        authManager = new BearerTokenReactiveAuthenticationManager();
        bearerAuthenticationFilter = new AuthenticationWebFilter(authManager);

        bearerAuthenticationFilter.setServerAuthenticationConverter(serverHttpBearerAuthenticationConverter);

        return bearerAuthenticationFilter;
    }

    @Bean
    public GlobalFilter customGlobalFilter() {
        return (exchange, chain) -> exchange.getPrincipal()
                .map(Principal::getName)
                .defaultIfEmpty("")
                .map(userName -> {
                    //adds header to proxied request
                    exchange.getRequest().mutate().header("username", userName).build();
                    return exchange;
                })
                .flatMap(chain::filter);
    }
}