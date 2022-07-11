package com.eunsil.guestbook.repository;

import com.eunsil.guestbook.domain.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
