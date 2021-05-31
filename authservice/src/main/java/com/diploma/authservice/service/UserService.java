package com.diploma.authservice.service;

import com.diploma.authservice.controller.rq.UserCredentials;
import com.diploma.authservice.repository.UserRepository;
import com.diploma.authservice.repository.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            log.debug("Юзер {} не найден", username);
            throw new UsernameNotFoundException("Username: " + username + " not found");
        } else {
            List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                    .commaSeparatedStringToAuthorityList("ROLE_" + user.getRole());
            log.debug("Юзер {} найден. User={}", username, user);
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), grantedAuthorities);
        }
    }

    public boolean saveUser(String username, String password, String role, String manager, boolean isTransportPassword) {
        User user = userRepository.findByUsername(username);

        if (user != null) {
            log.debug("Попытка регистрации существующего юзера {}", username);
            return false;
        } else {
            userRepository.save(User.builder()
                    .username(username)
                    .password(encoder.encode(password))
                    .transportPassword(isTransportPassword ? password : null)
                    .role(role)
                    .manager(manager)
                    .build());
            return true;
        }
    }

    public boolean updateUserPassword(String username, String oldPassword, String password) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            log.error("Попытка смены пароля несуществующего юзера {}", username);
            return false;
        } else if (!encoder.matches(oldPassword, user.getPassword())) {
            log.error("Попытка смены пароля юзера {} с неправильным паролем", username);
            return false;
        } else {
            user.setPassword(encoder.encode(password));
            userRepository.save(user);
            return true;
        }
    }

    public boolean updateManagerPassword(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            log.error("Попытка смены пароля несуществующего менеджера {}", username);
            return false;
        } else if (!user.getRole().equals("MANAGER")) {
            log.error("Попытка смены пароля не менеджера {}", username);
            return false;
        } else {
            user.setPassword(encoder.encode(password));
            user.setTransportPassword(password);
            userRepository.save(user);
            return true;
        }
    }

    public boolean updateStreamerPassword(String username, String password, String manager) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            log.error("Попытка смены пароля несуществующего стримера {}", username);
            return false;
        } else if (!user.getRole().equals("STREAMER")) {
            log.error("Попытка смены пароля не стримера {}", username);
            return false;
        } else if (!user.getManager().equals(manager)) {
            log.error("Попытка смены пароля стримера {} не принадлежащего менеджеру {}", username, manager);
            return false;
        } else {
            user.setPassword(encoder.encode(password));
            user.setTransportPassword(password);
            userRepository.save(user);
            return true;
        }
    }

    public List<UserCredentials> getStreamers(String manager) {
        List<User> streamers = userRepository.findAllByManager(manager);
        List<UserCredentials> res = new ArrayList<>();
        streamers.sort(Comparator.comparingInt(User::getId));
        streamers.forEach((s) -> {
            res.add(UserCredentials.builder()
                    .username(s.getUsername())
                    .password(s.getTransportPassword())
                    .build());
        });
        return res;
    }

    public List<UserCredentials> getManagers() {
        List<User> managers = userRepository.findAllByRole("MANAGER");
        List<UserCredentials> res = new ArrayList<>();
        managers.sort(Comparator.comparingInt(User::getId));
        managers.forEach((m) -> {
            res.add(UserCredentials.builder()
                    .username(m.getUsername())
                    .password(m.getTransportPassword())
                    .build());
        });
        return res;
    }

    public void deleteManager(String manager) {
        User user = userRepository.findByUsername(manager);
        if (user != null) {
            userRepository.deleteById(user.getId());
        }
    }

    public boolean deleteStreamer(String manager, String streamer) {
        User user = userRepository.findByUsername(streamer);
        if (user != null) {
            if (!user.getManager().equals(manager)) {
                return false;
            } else {
                userRepository.deleteById(user.getId());
            }
        }
        return true;
    }
}
