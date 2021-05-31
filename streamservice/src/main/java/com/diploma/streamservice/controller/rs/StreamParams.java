package com.diploma.streamservice.controller.rs;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
public class StreamParams {
    private String streamer;
    private String title;
    private String url;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Set<String> urls;
    private int subscribers;
    @JsonProperty("isSubscribed")
    private boolean isSubscribed;
    private Set<String> tags;
}
