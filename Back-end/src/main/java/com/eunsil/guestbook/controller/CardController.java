package com.eunsil.guestbook.controller;

import com.eunsil.guestbook.domain.dto.CardDTO;
import com.eunsil.guestbook.domain.entity.Card;
import com.eunsil.guestbook.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;
import java.util.HashMap;
import java.util.List;

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

    @GetMapping("/card/search")
    @ResponseBody
    public List<CardDTO> search(@RequestParam("page") Integer page, String location, String option, String username, String content) {
        return cardService.search(page, location, option, username, content);
    }

    @GetMapping("/card/all")
    public List<CardDTO> getAll(@RequestParam("page") Integer page) {
        return cardService.getAll(page);
    }

    @GetMapping("/card")
    public CardDTO getDetail(@RequestParam("id") String cardId) {
        return cardService.getDetail(cardId);
    }

}
