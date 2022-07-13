package com.eunsil.guestbook.service;

import com.eunsil.guestbook.domain.entity.Card;
import com.eunsil.guestbook.domain.entity.Comment;
import com.eunsil.guestbook.domain.entity.User;
import com.eunsil.guestbook.repository.CardRepository;
import com.eunsil.guestbook.repository.CommentRepository;
import com.eunsil.guestbook.repository.UserRepository;
import org.hibernate.type.LongType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class CommentService {
    private CardRepository cardRepository;
    private UserRepository userRepository;
    private CommentRepository commentRepository;

    @Autowired
    public CommentService(CardRepository cardRepository, UserRepository userRepository, CommentRepository commentRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    public String insert(String card_id, String name, String content) {
        Card card = cardRepository.findById(card_id); // 댓글 작성한 카드
        User user = userRepository.findByName(name);

        Comment comment = Comment.builder()
                .card(card)
                .user(user)
                .content(content)
                .postDate(LocalDate.now())
                .build();
        commentRepository.saveAndFlush(comment);
        return "ok";
    }

    public String delete(String comment_id) {
        commentRepository.deleteById(comment_id);
        return "ok";
    }
}
