package com.hjk.triplix.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.domain.member.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
	
	private final MemberRepository memberRepository;
	
	@Transactional
	public void register(Member member) {
		memberRepository.save(member);
	}
	
	@Transactional
	public int update(Member member, int id, Member principal) {
		Member memberEntity = memberRepository.findById(id).get();
		
		if(memberEntity.getId() == principal.getId()) {
			memberEntity.setMemail(member.getMemail());
			memberEntity.setMprofile(member.getMprofile());
			memberEntity.setMpw(member.getMpw());
			
			return 1;
		}else {
			return 0;
		}
	}
	
	@Transactional
	public int delete(int id, Member member) {
		Member memberEntity = memberRepository.findById(id).get();
		if(memberEntity.getId() == id) {
			memberRepository.deleteById(id);
			return 1;
		}else {
			return 0; 
		}
	}
}
