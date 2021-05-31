package com.diploma.managerservice.controller;

import com.diploma.managerservice.controller.rq.Streamer;
import com.diploma.managerservice.feign.AuthClient;
import com.diploma.managerservice.feign.StreamClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RestController
public class ManagerController {

    private final List<String> BLOCKED_USERNAMES = Arrays.asList("streamerPanel", "managerPanel", "adminPanel", "changePassword", "login", "register", "admin", "manager", "stream", "api");

    @Autowired
    private AuthClient authClient;
    @Autowired
    private StreamClient streamClient;

    @PostMapping("/registerStreamer")
    private ResponseEntity<String> registerStreamer(@RequestHeader("username") String manager, @RequestBody Streamer streamer) {
        log.debug("Запрос менеджером {} на создание стримера {}",manager, streamer.getUsername());
        if (BLOCKED_USERNAMES.contains(streamer.getUsername())) {
            return ResponseEntity.badRequest().body("Нельзя создать пользователя с таким именем");
        }
        ResponseEntity<String> response = authClient.registerStreamer(manager, streamer.getUsername());
        if (response.getStatusCode().is2xxSuccessful()) {
            streamClient.addStreamer(streamer.getUsername());
        }
        return response;
    }

    @PostMapping("/resetStreamerPassword")
    private ResponseEntity<String> resetStreamerPassword(@RequestHeader("username") String manager, @RequestBody Streamer streamer) {
        return authClient.resetStreamerPassword(manager, streamer.getUsername());
    }

    @GetMapping("/getStreamers")
    private List<Streamer> getStreamers(@RequestHeader("username") String manager) {
        log.debug("Запрос менеджером {} списка его стримеров", manager);
        return authClient.getStreamers(manager);
    }

    @DeleteMapping("/deleteStreamer")
    private ResponseEntity deleteStreamer(@RequestHeader("username") String manager, @RequestParam("streamer") String streamer) {
        log.debug("Запрос менеджером {} удаления стримера {}", manager, streamer);
        ResponseEntity response = authClient.deleteStreamer(manager, streamer);
        if (response.getStatusCode().is2xxSuccessful()) {
            streamClient.deleteParams(streamer);
        }
        return response;
    }

}
