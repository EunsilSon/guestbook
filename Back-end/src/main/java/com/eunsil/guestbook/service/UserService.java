
package com.eunsil.guestbook.service;

import com.eunsil.guestbook.domain.entity.User;
import com.eunsil.guestbook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * 로그인
     * @param name 사용자 이름
     * @param password 비밀번호
     * @return 로그인 성공 여부
     */
    public boolean signIn(String name, String password) {
        return userRepository.existsByNameAndPassword(name, password);
    }

    /**
     * 회원 가입
     * @param name 사용자 이름
     * @param password 비밀번호
     * @param telephone 연락처
     * @return 이름과 비밀번호 중복 값 체크 or 성공 여부
     */
    @Transactional
    public String signUp(String name, String password, String telephone) {

        if (userRepository.existsByName(name)) {
            return "Existed Username";
        }

        if (userRepository.existsByTelephone(telephone)) {
            return "Existed telephone";
        }

        User user = User.builder()
                .name(name)
                .password(password)
                .telephone(telephone)
                .build();
        userRepository.saveAndFlush(user);
        return "ok";
    }

    /**
     * ID 찾기
     * @param telephone 연락처
     * @return 찾은 ID or 성공 여부
     */
    public String findId(String telephone) {
        if (userRepository.existsByTelephone(telephone)) {
            User user = userRepository.findByTelephone(telephone);
            return user.getName();
        } else {
            return "fail";
        }
    }

    /**
     * PW 찾기
     * @param name 사용자 이름
     * @param telephone 연락처
     * @return 찾은 PW or 성공 여부
     */
    public String findPw(String name, String telephone) {
        if (userRepository.existsByNameAndTelephone(name, telephone)) {
            User user = userRepository.findPasswordByNameAndTelephone(name, telephone);
            return user.getPassword();
        } else {
            return "fail";
        }
    }

    /**
     * 사용자 권한 체크
     * @param username 사용자 이름
     * @return 관리자 권한 소유 여부
     */
    public boolean isAdmin(String username) {
        User user = userRepository.findUserByName(username);
        return user.isAdmin();
    }
}
