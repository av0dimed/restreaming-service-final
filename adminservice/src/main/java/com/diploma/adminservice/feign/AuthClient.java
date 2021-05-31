package com.diploma.adminservice.feign;

import com.diploma.adminservice.controller.rq.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient("auth-service")
public interface AuthClient {

    @GetMapping("/getManagers")
    List<User> getManagers();

    @PostMapping("/{manager}/add")
    ResponseEntity<String> registerManager(@PathVariable String manager);

    @DeleteMapping("/{manager}/delete")
    ResponseEntity deleteManager(@PathVariable String manager);

    @PostMapping("/{manager}/resetPassword")
    ResponseEntity<String> resetManagerPassword(@PathVariable String manager);


}
