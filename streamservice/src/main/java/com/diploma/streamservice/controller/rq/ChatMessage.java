package com.diploma.streamservice.controller.rq;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
public class ChatMessage {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String streamer;
    private String username;
    private String message;
}
