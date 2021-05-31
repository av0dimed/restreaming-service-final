package com.diploma.gateway.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class JwtUser {
    private String username;
    private List<String> authorities;
}
