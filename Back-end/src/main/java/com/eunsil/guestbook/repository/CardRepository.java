package com.eunsil.guestbook.repository;

import com.eunsil.guestbook.domain.entity.Card;
import com.eunsil.guestbook.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {

    @Query(value = "SELECT * FROM card WHERE id = :id", nativeQuery = true)
    Card findById(String id);

    @Query(value = "SELECT * FROM card WHERE content LIKE %:content%", nativeQuery = true)
    List<Card> findAllByContent(String content);

    //@Query(value = "SELECT * FROM card WHERE user LIKE %:username%", nativeQuery = true)
    List<Card> findAllByUser(User user);

}
