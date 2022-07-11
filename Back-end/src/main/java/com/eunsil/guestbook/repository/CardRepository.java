package com.eunsil.guestbook.repository;

import com.eunsil.guestbook.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
