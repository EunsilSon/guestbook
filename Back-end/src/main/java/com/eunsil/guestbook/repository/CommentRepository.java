package com.eunsil.guestbook.repository;

import com.eunsil.guestbook.domain.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "DELETE FROM Comment WHERE id = :comment_id")
    void deleteById(String comment_id);
}
