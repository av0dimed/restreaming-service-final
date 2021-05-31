package com.diploma.adminservice.feign;

import com.diploma.adminservice.controller.rq.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient("manager-service")
public interface ManagerClient {

    @GetMapping("/getStreamers")
    List<User> getStreamers(@RequestHeader("username") String manager);

    @DeleteMapping("/deleteStreamer")
    ResponseEntity deleteStreamer(@RequestHeader("username") String manager, @RequestParam("streamer") String streamer);
}
