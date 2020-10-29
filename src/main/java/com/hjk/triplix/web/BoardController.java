package com.hjk.triplix.web;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hjk.triplix.domain.board.Board;
import com.hjk.triplix.domain.board.BoardSaveRequestDto;
import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
	
	private final HttpSession session;
	private final BoardService boardService;
	
	@GetMapping("/")
	public List<Board> boardList(){
		return boardService.boardList();
	}
	
	@GetMapping("/detail/{id}")
	public Board boardDetail(@PathVariable int id) {
		System.out.println("boardDetail");
		Board board = boardService.boardDetail(id);
		return board;
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> boardDelete(HttpServletRequest request, @PathVariable int id) {
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			Board board = boardService.boardDetail(id);
			if(board.getMember().getId() == member.getId()) {
				boardService.boardDelete(id);
				return new ResponseEntity<String>("ok",HttpStatus.OK);
			}
			return new ResponseEntity<String>("not same writer",HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> boardSave(@RequestParam("image")MultipartFile[] files, @RequestParam("title") String title,@RequestParam("content") String content,@RequestParam("board") String board) throws IllegalStateException, IOException {
		System.out.println("board save 호출");
		String uploadFolder = "d:\\upload";
		String uploadFolderPath = getFolder();
		Member memberEntity = (Member) session.getAttribute("principal");
		String filename = "";
		File uploadPath = new File(uploadFolder, uploadFolderPath);
		if (uploadPath.exists() == false) {
			uploadPath.mkdirs();
		}
		for (MultipartFile file : files) {
	         UUID uuid = UUID.randomUUID();
	         String uploadFileName = uuid.toString() + "_" + file.getOriginalFilename();
	         File saveFile = new File(uploadPath, uploadFileName);
	         System.out.println(uploadPath);
	         System.out.println(uploadFileName);
	         filename = uploadPath+"\\"+uploadFileName;
	         file.transferTo(saveFile);
	          // TODO
	    }
		boardService.boardSave(title, content, filename, memberEntity);
		System.out.println("글 입력 성공");
		return new ResponseEntity<String>("ok", HttpStatus.CREATED);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> boardUpdate(HttpServletRequest request, @PathVariable int id, @RequestBody BoardSaveRequestDto dto) {
		HttpSession session = request.getSession();
		if(session.getAttribute("principal") != null) {
			Member member = (Member) session.getAttribute("principal");
			Board board = boardService.boardDetail(id);
			if(board.getMember().getId() == member.getId()) {
				System.out.println(dto);
				boardService.boardUpdate(id, dto);
				return new ResponseEntity<String>("ok",HttpStatus.OK);
			}
			return new ResponseEntity<String>("not same writer",HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<String>("You don't have authorization",HttpStatus.FORBIDDEN);
	}
	
	private String getFolder() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String str = sdf.format(date);
		return str.replace("-", File.separator);
	}
	
}
