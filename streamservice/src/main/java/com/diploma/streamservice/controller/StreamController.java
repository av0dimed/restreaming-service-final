package com.diploma.streamservice.controller;

import com.diploma.streamservice.controller.rs.StreamParams;
import com.diploma.streamservice.service.StreamParamsService;
import com.diploma.streamservice.service.WebsocketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class StreamController {

    @Autowired
    private StreamParamsService streamParamsService;
    @Autowired
    private WebsocketService websocketService;

    @GetMapping("/api/getParams")
    public ResponseEntity<?> getStreamParams(@RequestParam("streamer") String username) {
        log.debug("Запрос параметров стрима {}", username);
        StreamParams params = streamParamsService.getParams(username, false);
        if (params == null) {
            return ResponseEntity.badRequest().body("Не удалось получить данные трансляции");
        } else {
            return ResponseEntity.ok(params);
        }
    }

    @GetMapping("/api/subscribe")
    public ResponseEntity<?> subscribe(@RequestHeader("username") String username, @RequestParam("streamer") String streamer) {
        log.debug("Запрос подписки юзером {} на стримера {}", username, streamer);
        boolean isSuccessful = streamParamsService.subscribe(username, streamer);
        if (!isSuccessful) {
            return ResponseEntity.badRequest().body("Не удалось подписаться");
        } else {
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/api/unsubscribe")
    public ResponseEntity<?> unsubscribe(@RequestHeader("username") String username, @RequestParam("streamer") String streamer) {
        log.debug("Запрос отписки юзером {} от стримера {}", username, streamer);
        boolean isSuccessful = streamParamsService.unsubscribe(username, streamer);
        if (!isSuccessful) {
            return ResponseEntity.badRequest().body("Не удалось отписаться");
        } else {
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/api/getAllStreamers")
    public ResponseEntity<?> getAllStreamersParams(@RequestHeader("username") String username) {
        log.debug("Запрос параметров всех стримеров юзером {}", username);
        List<StreamParams> params = streamParamsService.getAllStreamersParams(username);
        if (params == null) {
            return ResponseEntity.badRequest().body("Не удалось получить данные о стримерах");
        } else {
            log.debug("Ответ: {}", params);
            return ResponseEntity.ok(params);
        }
    }

    @GetMapping("/api/getSubscribedStreamers")
    public ResponseEntity<?> getSubscribedStreamersParams(@RequestHeader("username") String username) {
        log.debug("Запрос своих подписок юзером {}", username);
        List<StreamParams> params = streamParamsService.getSubscribedStreamersParams(username);
        if (params == null) {
            return ResponseEntity.badRequest().body("Не удалось получить данные о подписках");
        } else {
            log.debug("Ответ: {}", params);
            return ResponseEntity.ok(params);
        }
    }

    @GetMapping("/api/getFullParams")
    public ResponseEntity<?> getFullParams(@RequestHeader("username") String username) {
        log.debug("Запрос полных параметров стрима {}", username);
        StreamParams params = streamParamsService.getParams(username, true);
        if (params == null) {
            return ResponseEntity.badRequest().body("Не удалось получить данные трансляции");
        } else {
            return ResponseEntity.ok(params);
        }
    }

    @PostMapping("/api/updateParams")
    public ResponseEntity<?> updateParams(@RequestHeader("username") String username, @RequestBody StreamParams params) {
        log.debug("Запрос на изменение параметров стрима {}, params={}", username, params);
        boolean isSuccessful = streamParamsService.updateParams(username, params);
        if (isSuccessful) {
            websocketService.sendNewUrl(username, params.getUrl());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("Не удалось сохранить данные трансляции");
        }
    }

    @PostMapping("/api/{streamer}/add")
    public ResponseEntity<?> addStreamer(@PathVariable String streamer) {
        log.debug("Запрос на добавление стримера {}", streamer);
        boolean isSuccessful = streamParamsService.addStreamer(streamer);
        if (isSuccessful) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("Не удалось добавить стримера");
        }
    }

    @DeleteMapping("api/{streamer}/delete")
    public ResponseEntity<?> deleteParams(@PathVariable String streamer) {
        log.debug("Запрос на удаление параметров стримера {}", streamer);
        streamParamsService.deleteStreamer(streamer);
        return ResponseEntity.ok().build();
    }
}
