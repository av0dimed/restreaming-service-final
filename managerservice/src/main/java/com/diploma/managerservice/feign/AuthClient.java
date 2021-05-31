package com.diploma.managerservice.feign;

import com.diploma.managerservice.controller.rq.Streamer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient("auth-service")
public interface AuthClient {

    @GetMapping("/{manager}/getStreamers")
    List<Streamer> getStreamers(@PathVariable String manager);

    @PostMapping("/{manager}/{streamer}/add")
    ResponseEntity<String> registerStreamer(@PathVariable String manager, @PathVariable String streamer);

    @DeleteMapping("/{manager}/{streamer}/delete")
    ResponseEntity deleteStreamer(@PathVariable String manager, @PathVariable String streamer);

    @PostMapping("/{manager}/{streamer}/resetPassword")
    ResponseEntity<String> resetStreamerPassword(@PathVariable String manager, @PathVariable String streamer);

}
