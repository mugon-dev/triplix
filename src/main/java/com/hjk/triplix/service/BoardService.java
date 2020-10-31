package com.hjk.triplix.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hjk.triplix.domain.board.Board;
import com.hjk.triplix.domain.board.BoardRepository;
import com.hjk.triplix.domain.board.BoardSaveRequestDto;
import com.hjk.triplix.domain.member.Member;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardService {

	private final BoardRepository boardRepository;
	
	@Transactional
	public void boardSave(String title, String content, String filename, Member member) {
		Board board = new Board();
		board.setBTitle(title);
		board.setBContent(content);
		board.setBImage(filename);
		board.setMember(member);
		boardRepository.save(board);
	}
	
	@Transactional
	public void boardDelete(int id) {
		boardRepository.deleteById(id);
	}
	
	@Transactional
	public void boardUpdate(int id, String title, String content,String filename) {
		Board boardEntity = boardRepository.findById(id).get();
//		if(dto.getBTitle()!=null)
		boardEntity.setBTitle(title);
//		if(dto.getBContent()!=null)
		boardEntity.setBContent(content);
//		if(dto.getBImage()!=null)
		boardEntity.setBImage(filename);
		boardRepository.save(boardEntity);
	}
	
	public Board boardDetail(int id) {
		Board board = boardRepository.findById(id).get();
		return board;
	}
	
	public List<Board> boardList(){
		return boardRepository.findAll();
	}

	public List<Board> boardMyList(int memberId) {
		return boardRepository.findAllMemberId(memberId);
	}
}
