package com.hjk.triplix.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hjk.triplix.domain.board.BoardRepository;
import com.hjk.triplix.domain.comment.Comment;
import com.hjk.triplix.domain.comment.CommentRepository;
import com.hjk.triplix.domain.comment.CommentSaveRequestDto;
import com.hjk.triplix.domain.member.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommentService {
	private final MemberRepository memberRepository;
	private final BoardRepository boardRepository;
	private final CommentRepository commentRepository;
	
	public List<Comment> commentList(){
		return commentRepository.findAll();
	}
	public Comment commentOne(int id) {
		return commentRepository.findById(id).get();
	}
	@Transactional
	public void commentSave(Comment comment) {
		commentRepository.save(comment);
	}
	@Transactional
	public void commentDelete(int id) {
		commentRepository.deleteById(id);
	}
	@Transactional
	public void commentUpdate(int id, CommentSaveRequestDto dto) {
		Comment commentEntity = commentRepository.findById(id).get();
		commentEntity.setComment(dto.getComment());
	}
	

}
