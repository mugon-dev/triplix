package com.hjk.triplix.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hjk.triplix.domain.board.Board;
import com.hjk.triplix.domain.good.Good;
import com.hjk.triplix.domain.good.GoodRepository;
import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.service.BoardService;
import com.hjk.triplix.service.GoodService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/good")
@RequiredArgsConstructor
public class GoodController {
	
	private final GoodService goodService;
	private final BoardService boardService;
	
	@GetMapping("/{id}")
	public Good goodOne(@PathVariable int id) {
		return goodService.goodOne(id);
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> goodSave(HttpServletRequest request, @RequestBody String bid) {
	    System.out.println("goodSaveController");
		int b_id = Integer.parseInt(bid);
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) { 
			Member member = (Member)
		    session.getAttribute("principal"); 
			Board board = boardService.boardDetail(b_id); 
			goodService.goodSave(member,board); 
			return new ResponseEntity<String>("ok",HttpStatus.OK); 
		}
		 
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?> goodDelete(HttpServletRequest request, @RequestBody String bid){
		HttpSession session = request.getSession();
		System.out.println("goodDelete컨트롤러");
		int b_id = Integer.parseInt(bid);
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			System.out.println("보드 아이디 는 : " + b_id);
			System.out.println("멤버 아이디 는 : " + member.getId());
			if(member.getId() != 0) {
				System.out.println("여기로옵니다.");
				Good good = goodService.myGood(member.getId(), b_id);
				System.out.println("굿 아이디는 ?  : " + good.getId());
				goodService.goodDelete(good.getId());
				return new ResponseEntity<String>("ok",HttpStatus.OK);
			}
			return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
	

}
