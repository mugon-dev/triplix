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
	public void boardSave(String title, String content, String filename, String latitude, String longitude,Member member) {
		Board board = new Board();
		board.setBTitle(title);
		board.setBContent(content);
		board.setBImage(filename);
		board.setLatitude(latitude);
		board.setLongitude(longitude);
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
		boardEntity.setBTitle(title);
		boardEntity.setBContent(content);
		boardEntity.setBImage(filename);
		boardRepository.save(boardEntity);
	}
	
	@Transactional
	public int boardGoodNumPlus(int bid) {
		Board boardEntity = boardRepository.findById(bid).get();
		boardEntity.setBGoodNum(boardEntity.getBGoodNum()+1);
		System.out.println(boardEntity.getBGoodNum()+ " dddd");
		return boardEntity.getBGoodNum();
	}
	
	@Transactional
	public void boardGoodNumMinus(int bid) {
		Board boardEntity = boardRepository.findById(bid).get();
		boardEntity.setBGoodNum(boardEntity.getBGoodNum()-1);
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
