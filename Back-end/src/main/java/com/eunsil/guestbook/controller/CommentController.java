package com.eunsil.guestbook.controller;

import com.eunsil.guestbook.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "http://127.0.0.1:8080")
@RestController
public class CommentController {
    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/comment")
    @ResponseBody
    public String insert(@RequestBody HashMap<String, String> param) {
        return commentService.insert(param.get("card_id"), param.get("name"), param.get("content"));
    }

    @DeleteMapping("/comment")
    @ResponseBody
    public String delete(@RequestBody HashMap<String, String> param) {
        return commentService.delete(param.get("comment_id"));
    }
}
