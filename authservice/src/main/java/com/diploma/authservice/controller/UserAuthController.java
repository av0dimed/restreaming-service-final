package com.diploma.authservice.controller;

import com.diploma.authservice.controller.rq.UserCredentials;
import com.diploma.authservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RestController
public class UserAuthController {

    private final List<String> BLOCKED_USERNAMES = Arrays.asList("streamerPanel", "managerPanel", "adminPanel", "changePassword", "login", "register", "admin", "manager", "stream", "api");

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserCredentials request) {
        if (BLOCKED_USERNAMES.contains(request.getUsername())) {
            return ResponseEntity.badRequest().body("Нельзя создать пользователя с таким именем");
        }
        boolean isSuccessful = userService.saveUser(request.getUsername(), request.getPassword(), "USER", null, false);
        if (isSuccessful) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("Не удалось зарегистрироваться. Пользователь с таким именем уже существует");
        }
    }

    @PostMapping("/login")
    public void login() {
    }

    @PostMapping("/changePassword")
    public ResponseEntity changePassword(@RequestHeader("username") String username, @RequestBody UserCredentials request) {
        log.debug("Запрос на изменение пароля юзером {}", username);
        boolean isSuccessful = userService.updateUserPassword(username, request.getOldPassword(), request.getPassword());
        if (isSuccessful) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("Неверный пароль");
        }
    }

}
