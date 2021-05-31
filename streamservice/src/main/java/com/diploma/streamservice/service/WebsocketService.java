package com.diploma.streamservice.service;

import com.diploma.streamservice.controller.rq.ChatMessage;
import com.diploma.streamservice.ws.StreamUrl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class WebsocketService {

    @Autowired
    private SimpMessagingTemplate template;

    public void sendNewUrl(String username, String url) {
        log.debug("WS: /stream/url/{} msg={}", username, url);
        template.convertAndSend("/stream/url/" + username, new StreamUrl(url));
    }

    public void sendMessage(ChatMessage chatMessage) {
        String streamer = chatMessage.getStreamer();
        chatMessage.setStreamer(null);
        log.debug("WS: /stream/chat/{} msg={}", streamer, chatMessage);
        template.convertAndSend("/stream/chat/" + streamer, chatMessage);
    }

}
