package com.hjk.triplix.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hjk.triplix.domain.board.Board;
import com.hjk.triplix.domain.board.BoardRepository;
import com.hjk.triplix.domain.good.Good;
import com.hjk.triplix.domain.good.GoodRepository;
import com.hjk.triplix.domain.member.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GoodService {
	
	private final GoodRepository goodRepository;
	
	@Transactional
	public void goodSave(Member member,Board board) {
		Good good = new Good();
		good.setBoard(board);
		good.setMember(member);
		goodRepository.save(good);
	}
	
	@Transactional
	public void myGood(int mid, int bid) {
		goodRepository.mFindMyId(mid, bid);
	}
	
	@Transactional
	public Good goodOne(int id) {
		return goodRepository.findById(id).get();
	}
	
	@Transactional
	public List<Good> goodList() {
		return goodRepository.findAll();
	}
	
	@Transactional
	public void goodDelete(int id) {
		goodRepository.deleteById(id);
	}
	
	
	

}
