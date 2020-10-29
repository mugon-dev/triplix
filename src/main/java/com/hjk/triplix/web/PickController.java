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
	
	@GetMapping("/{id")
	public Pick pickOne(@PathVariable int id) {
		return pickService.pickOne(id);
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<?> goodSave(HttpServletRequest request, @PathVariable int id) {
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			Board board = boardService.boardDetail(id);
			pickService.pickSave(member, board);
			return new ResponseEntity<String>("ok",HttpStatus.OK);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> goodDelete(HttpServletRequest request, @PathVariable int id){
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			Pick pick = pickService.pickOne(id);
			if(member.getId()==pick.getMember().getId()) {
				pickService.pickDelete(id);
				return new ResponseEntity<String>("ok",HttpStatus.OK);
			}
			return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
}
