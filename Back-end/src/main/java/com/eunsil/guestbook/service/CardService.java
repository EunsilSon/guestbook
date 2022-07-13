package com.eunsil.guestbook.service;

import com.eunsil.guestbook.domain.entity.Card;
import com.eunsil.guestbook.domain.entity.User;
import com.eunsil.guestbook.repository.CardRepository;
import com.eunsil.guestbook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class CardService {
    private CardRepository cardRepository;
    private UserRepository userRepository;

    @Autowired
    public CardService(CardRepository cardRepository, UserRepository userRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

    public String insert(String name, String content) {
        User user = userRepository.findByName(name);

        Card card = Card.builder()
                .user(user)
                .content(content)
                .postDate(LocalDate.now())
                .build();
        cardRepository.saveAndFlush(card);
        return "ok";
    }

    public String update(String card_id, String content) {
        Card card = cardRepository.findById(card_id);
        card.setContent(content);
        cardRepository.saveAndFlush(card);
        return "ok";
    }

    public String delete(String card_id) {
        Card card = cardRepository.findById(card_id);
        cardRepository.deleteById(card.id);
        return "ok";
    }

}
