package com.diploma.streamservice.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "parameters")
public class Parameters {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String username;
    private String title;
    private String activeUrl;
    @ElementCollection
    private Set<String> urls;
    @ElementCollection
    private Set<String> subscribers;
    @ElementCollection
    private Set<String> tags;

}
