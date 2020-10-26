package com.hjk.triplix.web;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.domain.member.MemberRepository;
import com.hjk.triplix.service.MemberService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/member")
@RestController
@RequiredArgsConstructor
public class MemberController {
	
	private final HttpSession session;
	private final MemberService memberService;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody Member member){
		
		System.out.println(member);
		memberService.register(member);
		return new ResponseEntity<String>("ok",HttpStatus.CREATED);
		/*
		 * System.out.println(member.getMId()); memberService.register(member); return
		 * new ResponseEntity<String>("ok",HttpStatus.CREATED);
		 */
	}
	
	@GetMapping("/aaaa")
	public String aaa() {
		return "aaaa";
	}
	
	@GetMapping("/logout")
	public ResponseEntity<?> logout(){
		session.invalidate();
		return new ResponseEntity<String>("ok",HttpStatus.OK);
	}
}
