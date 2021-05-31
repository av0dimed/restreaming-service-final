package com.diploma.authservice.controller;

import com.diploma.authservice.controller.rq.UserCredentials;
import com.diploma.authservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class StreamerAuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/{manager}/getStreamers")
    public List<UserCredentials> getStreamers(@PathVariable String manager) {
        log.debug("Запрос всех стримеров менеджера {}", manager);
        return userService.getStreamers(manager);
    }

    @PostMapping("/{manager}/{streamer}/add")
    public ResponseEntity<String> addStreamer(@PathVariable String manager, @PathVariable String streamer) {
        String generatedPassword = RandomStringUtils.random(8, true, false);
        boolean isSuccessful = userService.saveUser(streamer, generatedPassword, "STREAMER", manager, true);
        if (isSuccessful) {
            return ResponseEntity.ok(generatedPassword);
        } else {
            return ResponseEntity.badRequest().body("Не удалось добавить стримера");
        }
    }

    @PostMapping("/{manager}/{streamer}/resetPassword")
    public ResponseEntity<String> resetStreamerPassword(@PathVariable String manager, @PathVariable String streamer) {
        String generatedPassword = RandomStringUtils.random(8, true, false);
        boolean isSuccessful = userService.updateStreamerPassword(streamer, generatedPassword, manager);
        if (isSuccessful) {
            return ResponseEntity.ok(generatedPassword);
        } else {
            return ResponseEntity.badRequest().body("Не удалось сбросить пароль стримера");
        }
    }

    @DeleteMapping("{manager}/{streamer}/delete")
    public ResponseEntity deleteStreamer(@PathVariable String manager, @PathVariable String streamer) {
        log.debug("Запрос менеджером {} на удаление стримера {}",manager, streamer);
        boolean isSuccessful = userService.deleteStreamer(manager, streamer);
        if (isSuccessful) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("Не удалось удалить стримера");
        }
    }
}
