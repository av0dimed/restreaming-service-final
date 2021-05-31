package com.diploma.adminservice.controller;

import com.diploma.adminservice.controller.rq.User;
import com.diploma.adminservice.feign.AuthClient;
import com.diploma.adminservice.feign.ManagerClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RestController
public class AdminController {

    private final List<String> BLOCKED_USERNAMES = Arrays.asList("streamerPanel", "managerPanel", "adminPanel", "changePassword", "login", "register", "admin", "manager", "stream", "api");

    @Autowired
    private AuthClient authClient;
    @Autowired
    private ManagerClient managerClient;

    @PostMapping("/registerManager")
    private ResponseEntity<String> registerManager(@RequestBody User manager) {
        log.debug("Запрос на регистрацию менеджера {}", manager.getUsername());
        if (BLOCKED_USERNAMES.contains(manager.getUsername())) {
            return ResponseEntity.badRequest().body("Нельзя создать пользователя с таким именем");
        }
        return authClient.registerManager(manager.getUsername());
    }

    @PostMapping("/resetManagerPassword")
    private ResponseEntity<String> resetManagerPassword(@RequestBody User manager) {
        return authClient.resetManagerPassword(manager.getUsername());
    }

    @DeleteMapping("/deleteManager")
    private ResponseEntity<?> deleteManager(@RequestParam("manager") String manager) {
        log.debug("Запрос на удаление менеджера {}", manager);
        List<User> streamers = managerClient.getStreamers(manager);
        streamers.forEach(s -> {
            log.debug("Удаление стримера {} менеджера {}", s.getUsername(), manager);
            managerClient.deleteStreamer(manager, s.getUsername());
        });
        return authClient.deleteManager(manager);
    }

    @GetMapping("/getManagers")
    private List<User> getManagers() {
        return authClient.getManagers();
    }

}
