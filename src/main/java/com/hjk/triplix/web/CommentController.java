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

import com.hjk.triplix.domain.board.Board;
import com.hjk.triplix.domain.comment.Comment;
import com.hjk.triplix.domain.comment.CommentSaveRequestDto;
import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.service.BoardService;
import com.hjk.triplix.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
	private final CommentService commentService;
	private final BoardService boardService;
	
	@GetMapping("/{bid}")
	public List<Comment> CommentList(@PathVariable int bid) {
		return commentService.commentList(bid);
	}
	
	@PostMapping("/save/{id}")
	public ResponseEntity<?> CommentSave(@RequestBody Comment comment, @PathVariable int id, HttpServletRequest request) {
		HttpSession session = request.getSession();
		System.out.println("commentSaveController");
		if(session.getAttribute("principal") != null) {
			System.out.println("commentSaveController2"); 
			Member member = (Member)session.getAttribute("principal"); 
			Board board = boardService.boardDetail(id); 
			comment.setBoard(board);
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
