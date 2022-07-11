package com.eunsil.guestbook.controller;

import com.eunsil.guestbook.service.SignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "http://127.0.0.1:8080")
@RestController
public class SignController {
    private SignService signService;

    @Autowired
    public SignController(SignService signService) {
        this.signService = signService;
    }

    @PostMapping("/sign_in")
    @ResponseBody
    public String signIn(@RequestBody HashMap<String, String> param) {
        return signService.signIn(param.get("username"), param.get("password"));
    }

    @PostMapping("/sign_up")
    @ResponseBody
    public String signUp(@RequestBody HashMap<String, String> param) {
        return signService.signUp(param.get("username"), param.get("password"), param.get("telephone"));
    }

    @GetMapping("/id")
    @ResponseBody
    public String findId(@RequestBody HashMap<String, String> param) {
        return signService.findId(param.get("telephone"));
    }

    @GetMapping("/pw")
    @ResponseBody
    public String findPw(@RequestBody HashMap<String, String> param) {
        return signService.findPw(param.get("username"), param.get("telephone"));
    }
}
