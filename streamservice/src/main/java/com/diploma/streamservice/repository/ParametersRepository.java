package com.diploma.streamservice.repository;

import com.diploma.streamservice.repository.entity.Parameters;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParametersRepository extends JpaRepository<Parameters, Integer> {

    Parameters findByUsername(String username);

    List<Parameters> findBySubscribers(String subscriber);

}
