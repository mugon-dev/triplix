package com.hjk.triplix.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hjk.triplix.domain.board.Board;
import com.hjk.triplix.domain.board.BoardRepository;
import com.hjk.triplix.domain.board.BoardSaveRequestDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardService {

	private final BoardRepository boardRepository;
	
	@Transactional
	public void boardSave(Board board) {
		boardRepository.save(board);
	}
	
	@Transactional
	public void boardDelete(int id) {
		boardRepository.deleteById(id);
	}
	
	@Transactional
	public void boardUpdate(int id, BoardSaveRequestDto dto) {
		Board boardEntity = boardRepository.findById(id).get();
		boardEntity.setBTitle(dto.getBTitle());
		boardEntity.setBContent(dto.getBContent());
	}
	
	public Board boardDetail(int id) {
		Board board = boardRepository.findById(id).get();
		return board;
	}
	
	public List<Board> boardList(){
		return boardRepository.findAll();
	}
}
