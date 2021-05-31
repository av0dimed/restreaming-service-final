package com.diploma.authservice.controller;

import com.diploma.authservice.controller.rq.UserCredentials;
import com.diploma.authservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class ManagerAuthController {

    @Autowired
    private UserService userService;

    // TODO: надо ли
//    @GetMapping("/{manager}/get")
//    public List<String> getManager(@PathVariable String manager) {
//        return userService.getManagers();
//    }

    @GetMapping("/getManagers")
    public List<UserCredentials> getManagers() {
        return userService.getManagers();
    }

    @PostMapping("/{manager}/add")
    public ResponseEntity<String> addManager(@PathVariable String manager) {
        String generatedPassword = RandomStringUtils.random(8, true, false);
        boolean isSuccessful = userService.saveUser(manager, generatedPassword, "MANAGER", null, true);
        if (isSuccessful) {
            return ResponseEntity.ok(generatedPassword);
        } else {
            return ResponseEntity.badRequest().body("Не удалось добавить менеджера");
        }
    }

    @PostMapping("/{manager}/resetPassword")
    public ResponseEntity<String> resetManagerPassword(@PathVariable String manager) {
        String generatedPassword = RandomStringUtils.random(8, true, false);
        boolean isSuccessful = userService.updateManagerPassword(manager, generatedPassword);
        if (isSuccessful) {
            return ResponseEntity.ok(generatedPassword);
        } else {
            return ResponseEntity.badRequest().body("Не удалось сбросить пароль менеджера");
        }
    }

    @DeleteMapping("/{manager}/delete")
    public ResponseEntity deleteManager(@PathVariable String manager) {
        log.debug("Запрос админом на удаление менеджера {}",manager);
        userService.deleteManager(manager);
        return ResponseEntity.ok().build();
    }

}
