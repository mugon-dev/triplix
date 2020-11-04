package com.hjk.triplix.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hjk.triplix.domain.board.Board;
import com.hjk.triplix.domain.board.BoardRepository;
import com.hjk.triplix.domain.good.Good;
import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.domain.pick.Pick;
import com.hjk.triplix.domain.pick.PickRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PickService {
	
	private final PickRepository pickRepository;
	
	@Transactional
	public void pickSave(Member member, Board board) {
		Pick pick = new Pick();
		pick.setMember(member);
		pick.setBoard(board);
		pickRepository.save(pick);
	}
	
	@Transactional
	public Pick myPick(int mid, int bid) {
		return pickRepository.mFindMyId(mid, bid);
	}
	
	@Transactional
	public void pickDelete(int id) {
		pickRepository.deleteById(id);
	}
	
	@Transactional
	public Pick pickOne(int id) {
		return pickRepository.findById(id).get();
	}
	
	@Transactional
	public List<Pick> pickList() {
		return pickRepository.findAll();
	}
	
	@Transactional
	public List<Pick> pickMemberList(int memberId) {
		return pickRepository.mFindMemberId(memberId);
	}

}
