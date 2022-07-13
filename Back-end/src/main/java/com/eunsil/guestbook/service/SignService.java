package com.eunsil.guestbook.service;

import com.eunsil.guestbook.domain.entity.User;
import com.eunsil.guestbook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignService {

    private UserRepository userRepository;

    @Autowired
    public SignService (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String signIn(String name, String pw) {
        if (userRepository.findUserByNameAndPassword(name, pw).isEmpty()) {
            return "fail";
        } else {
            return "ok";
        }
    }

    public String signUp(String name, String pw, String tel) {
        if (userRepository.findByName(name) != null) {
            return "Existed";
        } else {
            User user = User.builder()
                    .name(name)
                    .password(pw)
                    .telephone(tel)
                    .build();
            userRepository.saveAndFlush(user);
            return "ok";
        }
    }

    public String findId(String tel) {
        User user = userRepository.findUsernameByTelephone(tel);
        if (user == null) {
            return "fail";
        } else {
            return user.name;
        }
    }

    public String findPw(String name, String tel) {
        User user = userRepository.findPasswordByNameAndTelephone(name, tel);
        if (user == null) {
            return "fail";
        } else {
            return user.password;
        }
    }
}
