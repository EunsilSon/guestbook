package com.eunsil.guestbook.repository;

import com.eunsil.guestbook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
