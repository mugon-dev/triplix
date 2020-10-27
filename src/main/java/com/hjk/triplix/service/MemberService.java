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
	public void update(int id, Member member) {
		System.out.println("update service");
		Member memberEntity = memberRepository.findById(id).get();
		System.out.println(memberEntity);
		if(member.getMemail()!=null) {
			memberEntity.setMemail(member.getMemail());
		}
		if(member.getMprofile()!=null) {
			memberEntity.setMprofile(member.getMprofile());
		}
		if(member.getMpw()!=null) {
			memberEntity.setMpw(member.getMpw());
		}
		System.out.println(memberEntity);
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
