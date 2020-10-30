package com.hjk.triplix.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.domain.member.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
	
	private final MemberRepository memberRepository;
	
	public List<Member> memberList(){
		return memberRepository.findAll();
	}
	
	@Transactional
	public void register(Member member) {
		memberRepository.save(member);
	}
	
	@Transactional
	public void update(int id, Member member) {
		System.out.println("update service");
		//예외처리필요
		Member memberEntity = memberRepository.findById(id).get();
		if(member.getMemail()!=null) {
			memberEntity.setMemail(member.getMemail());
		}
		if(member.getMprofile()!=null) {
			memberEntity.setMprofile(member.getMprofile());
		}
		if(member.getMpw()!=null) {
			memberEntity.setMpw(member.getMpw());
		}
	}
	
	@Transactional
	public void delete(int id) {
		memberRepository.deleteById(id);
	}
	
	@Transactional
	public Member member(int id) {
		//예외처리 필요
		Member member = memberRepository.findById(id).get();
		return member;
	}

	@Transactional
	public void updateImage(int id, String filename) {
		Member member = memberRepository.findById(id).get();
		member.setMimage(filename);
		
	}
	
	@Transactional
	public void updateProfile(int id, String profile) {
		Member member = memberRepository.findById(id).get();
		member.setMprofile(profile);
		
	}
}
