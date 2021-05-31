package com.diploma.managerservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("stream-service")
public interface StreamClient {

    @PostMapping("/api/{streamer}/add")
    ResponseEntity addStreamer(@PathVariable String streamer);

    @DeleteMapping("api/{streamer}/delete")
    ResponseEntity deleteParams(@PathVariable String streamer);

}
