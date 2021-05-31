package com.diploma.streamservice.controller;

import com.diploma.streamservice.controller.rq.ChatMessage;
import com.diploma.streamservice.service.WebsocketService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class ChatController {

    @Autowired
    private WebsocketService websocketService;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        log.debug("Пришло сообщение для чата {}", chatMessage);
        if (StringUtils.isNotBlank(chatMessage.getStreamer())
                && StringUtils.isNotBlank(chatMessage.getUsername())
                && StringUtils.isNotBlank(chatMessage.getMessage())) {
            websocketService.sendMessage(chatMessage);
        }
    }

}
