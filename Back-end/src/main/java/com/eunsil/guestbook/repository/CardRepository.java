package com.eunsil.guestbook.repository;

import com.eunsil.guestbook.domain.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CardRepository extends JpaRepository<Card, Long> {

    @Query(value = "SELECT * FROM card WHERE id = :id", nativeQuery = true)
    Card findById(String id);

}
