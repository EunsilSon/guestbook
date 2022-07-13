package com.eunsil.guestbook.controller;

import com.eunsil.guestbook.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "http://127.0.0.1:8080")
@RestController
public class CardController {
    private CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("/card")
    @ResponseBody
    public String insert(@RequestBody HashMap<String, String> param) {
        return cardService.insert(param.get("username"), param.get("content"));
    }

    @PatchMapping("/card")
    @ResponseBody
    public String update(@RequestBody HashMap<String, String> param) {
        return cardService.update(param.get("card_id"), param.get("content"));
    }

    @DeleteMapping("/card")
    @ResponseBody
    public String delete(@RequestBody HashMap<String, String> param) {
        return cardService.delete(param.get("card_id"));
    }

}