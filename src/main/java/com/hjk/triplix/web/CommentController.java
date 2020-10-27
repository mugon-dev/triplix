package com.hjk.triplix.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hjk.triplix.domain.comment.Comment;
import com.hjk.triplix.domain.comment.CommentSaveRequestDto;
import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
	private CommentService commentService;
	
	@GetMapping("/")
	public List<Comment> CommentList() {
		return commentService.commentList();
	}
	@GetMapping("/{id}")
	public Comment CommentOne(@PathVariable int id) {
		return commentService.commentOne(id);
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> CommentSave(HttpServletRequest request, @RequestBody Comment comment) {
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			comment.setMember(member);
			commentService.commentSave(comment);
			return new ResponseEntity<String>("ok",HttpStatus.OK);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> CommentUpdate(HttpServletRequest request, @PathVariable int id, @RequestBody CommentSaveRequestDto dto) {
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			Comment comment = commentService.commentOne(id);
			if(comment.getMember().getId() == member.getId()) {
				commentService.commentUpdate(id, dto);
				return new ResponseEntity<String>("ok",HttpStatus.OK);
			}
			return new ResponseEntity<String>("not same writer",HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> CommentDelete(HttpServletRequest request, @PathVariable int id) {
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			Comment comment = commentService.commentOne(id);
			if(comment.getMember().getId() == member.getId()) {
				commentService.commentDelete(id);
				return new ResponseEntity<String>("ok",HttpStatus.OK);
			}
			return new ResponseEntity<String>("not same writer",HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
		
	}
}
