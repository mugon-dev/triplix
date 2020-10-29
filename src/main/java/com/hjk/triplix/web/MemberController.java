package com.hjk.triplix.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hjk.triplix.domain.member.Member;
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
	}

	@GetMapping("/logout")
	public ResponseEntity<?> logout(){
		session.invalidate();
		return new ResponseEntity<String>("ok",HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(HttpServletRequest request, @RequestBody Member member){
		System.out.println("update 호출");
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member originMember = (Member) session.getAttribute("principal");
			int id = originMember.getId();
			System.out.println("id: "+originMember.getId());
			System.out.println("member: "+member);
			memberService.update(id,member);
			return new ResponseEntity<String>("ok",HttpStatus.OK);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
	@DeleteMapping("/delete")
	public ResponseEntity<?> delete(HttpServletRequest request){
		System.out.println("delete 호출");
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member originMember = (Member) session.getAttribute("principal");
			int id = originMember.getId();
			System.out.println("id: "+originMember.getId());
			memberService.delete(id);
		}
		return new ResponseEntity<String>("ok",HttpStatus.CREATED);
	}
	@PostMapping("/detail")
	public ResponseEntity<?> member(HttpServletRequest request){
		System.out.println("member/detail");
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			int id = member.getId();
			System.out.println("id: "+member.getId());
			Member memberEntity = memberService.member(id);
			return new ResponseEntity<Member>(memberEntity,HttpStatus.OK);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
	@GetMapping("/{id}")
	public Member memberOne(@PathVariable int id) {
		return memberService.member(id);
	}
}
