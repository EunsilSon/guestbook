package com.eunsil.guestbook.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://127.0.0.1:8080")
@RestController
public class cardController {

    @GetMapping("/")
    public String getCard() {
        return "success get card";
    }
}
