package com.eunsil.guestbook.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column
    public String name;

    @Column
    public String password;

    @Column
    public String telephone;

    @Column(columnDefinition = "boolean default true")
    public boolean isAdmin;
}
