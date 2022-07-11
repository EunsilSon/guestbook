package com.eunsil.guestbook.controller;

import com.eunsil.guestbook.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://127.0.0.1:8080")
@RestController
public class CardController {
    private CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }
}
