package com.diploma.streamservice.service;

import com.diploma.streamservice.controller.rs.StreamParams;
import com.diploma.streamservice.repository.ParametersRepository;
import com.diploma.streamservice.repository.entity.Parameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class StreamParamsService {

    @Autowired
    private ParametersRepository parametersRepository;

    public StreamParams getParams(String username, boolean full) {
        Parameters data = parametersRepository.findByUsername(username);
        if (data == null) {
            return null;
        } else {
            return StreamParams.builder()
                    .title(data.getTitle())
                    .url(data.getActiveUrl())
                    .urls(full
                            ? (data.getUrls() != null ? data.getUrls() : Collections.emptySet())
                            : null)
                    .tags(data.getTags())
                    .subscribers(data.getSubscribers().size())
                    .isSubscribed(data.getSubscribers().contains(username))
                    .build();
        }
    }

    public List<StreamParams> getAllStreamersParams(String username) {
        List<Parameters> data = parametersRepository.findAll();
        List<StreamParams> res = new ArrayList<>();
        for (Parameters p : data) {
            res.add(StreamParams.builder()
                    .streamer(p.getUsername())
                    .title(p.getTitle())
                    .tags(p.getTags())
                    .subscribers(p.getSubscribers().size())
                    .isSubscribed(p.getSubscribers().contains(username))
                    .build());
        }
        res.sort(Comparator.comparing(StreamParams::getSubscribers).reversed().thenComparing(StreamParams::getStreamer));
        return res;
    }

    public List<StreamParams> getSubscribedStreamersParams(String username) {
        List<Parameters> data = parametersRepository.findBySubscribers(username);
        List<StreamParams> res = new ArrayList<>();
        for (Parameters p : data) {
            res.add(StreamParams.builder()
                    .streamer(p.getUsername())
                    .title(p.getTitle())
                    .tags(p.getTags())
                    .subscribers(p.getSubscribers().size())
                    .isSubscribed(true)
                    .build());
        }
        res.sort(Comparator.comparing(StreamParams::getSubscribers).reversed().thenComparing(StreamParams::getStreamer));
        return res;
    }

    public boolean updateParams(String username, StreamParams params) {
        Parameters parameters = parametersRepository.findByUsername(username);
        if (parameters == null) {
            return false;
        } else {
            parameters.setTitle(params.getTitle());
            parameters.setActiveUrl(params.getUrl());
            parameters.setUrls(params.getUrls());
            parameters.setTags(params.getTags());
            parametersRepository.save(parameters);
            return true;
        }
    }

    public boolean addStreamer(String username) {
        Parameters parameters = parametersRepository.findByUsername(username);
        if (parameters != null) {
            return false;
        } else {
            parametersRepository.save(Parameters.builder()
                    .username(username)
                    .build());
            return true;
        }
    }

    public void deleteStreamer(String username) {
        Parameters parameters = parametersRepository.findByUsername(username);
        if (parameters != null) {
            parametersRepository.deleteById(parameters.getId());
        }
    }

    public boolean subscribe(String username, String streamer) {
        Parameters parameters = parametersRepository.findByUsername(streamer);
        if (parameters == null) {
            return false;
        } else {
            parameters.getSubscribers().add(username);
            parametersRepository.save(parameters);
            return true;
        }
    }

    public boolean unsubscribe(String username, String streamer) {
        Parameters parameters = parametersRepository.findByUsername(streamer);
        if (parameters == null) {
            return false;
        } else {
            parameters.getSubscribers().remove(username);
            parametersRepository.save(parameters);
            return true;
        }
    }
}
