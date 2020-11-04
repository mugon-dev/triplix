package com.hjk.triplix.web;

import java.util.List;

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
import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.domain.pick.Pick;
import com.hjk.triplix.service.BoardService;
import com.hjk.triplix.service.PickService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/pick")
@RequiredArgsConstructor
public class PickController {
	
	private final PickService pickService;
	private final BoardService boardService;
	
	@GetMapping("/")
	public List<Pick> pickList(){
		return pickService.pickList();
	}
	
	@GetMapping("/{id}")
	public Pick pickOne(@PathVariable int id) {
		return pickService.pickOne(id);
	}
	
	
	@PostMapping("/save")
	public ResponseEntity<?> pickSave(HttpServletRequest request, @RequestBody String bid) {
		System.out.println("pickSaveController");
		int b_id = Integer.parseInt(bid);
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member member = (Member)session.getAttribute("principal"); 
			Board board = boardService.boardDetail(b_id); 
			pickService.pickSave(member, board);
			return new ResponseEntity<String>("ok",HttpStatus.OK);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?> pickDelete(HttpServletRequest request, @RequestBody String bid){
		HttpSession session = request.getSession();
		System.out.println("pickDeleteController");
		int b_id = Integer.parseInt(bid);
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			System.out.println("보드 아이디 는 : " + b_id);
			System.out.println("멤버 아이디 는 : " + member.getId());
			if(member.getId() != 0) {
				Pick pick = pickService.myPick(member.getId(), b_id);
				System.out.println("픽 아이디는 ?  : " + pick.getId());
				pickService.pickDelete(pick.getId());
				return new ResponseEntity<String>("ok",HttpStatus.OK);
			}
			return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
}
