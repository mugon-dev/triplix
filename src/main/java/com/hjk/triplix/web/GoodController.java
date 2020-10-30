package com.hjk.triplix.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hjk.triplix.domain.board.Board;
import com.hjk.triplix.domain.good.Good;
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
	
	@GetMapping("/{mid}/{bid}")
	public String myGood(@PathVariable int mid, @PathVariable int bid) {
		System.out.print("옵니까요");
		//System.out.println("있씁니까 엠아이디 : " + mid);
		//goodService.myGood(mid, bid);
		return "ok";
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<?> goodSave(HttpServletRequest request, @PathVariable int id) {
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			Board board = boardService.boardDetail(id);
			goodService.goodSave(member,board);
			return new ResponseEntity<String>("ok",HttpStatus.OK);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> goodDelete(HttpServletRequest request, @PathVariable int id){
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			Good good = goodService.goodOne(id);
			if(member.getId()==good.getMember().getId()) {
				goodService.goodDelete(id);
				return new ResponseEntity<String>("ok",HttpStatus.OK);
			}
			return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
	

}
