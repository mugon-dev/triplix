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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.service.MemberService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/member")
@RestController
@RequiredArgsConstructor
public class MemberController {
	
	private final HttpSession session;
	private final MemberService memberService;
	
	@GetMapping({"","/"})
	public List<Member> memberList(){
		return memberService.memberList();
	}
	
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
	
	@PutMapping("/profile")
	public ResponseEntity<?> profile(HttpServletRequest request, @RequestBody String profile){
		System.out.println("update profile 호출");
		HttpSession session = request.getSession();
		System.out.println(profile);
		if(session.getAttribute("principal") != null) {
			Member originMember = (Member) session.getAttribute("principal");
			int id = originMember.getId();
			System.out.println("id: "+originMember.getId());
			System.out.println(profile);
			memberService.updateProfile(id,profile);
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
	@GetMapping("/detail")
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
	
	@PostMapping("/image")
	public ResponseEntity<?> memberImage(HttpServletRequest request, @RequestParam("image")MultipartFile file) throws IllegalStateException, IOException {
		System.out.println("member image 호출");
		String uploadFolder = "C:\\workspace\\project\\triplix\\src\\main\\webapp\\triplix-app\\public\\postImages";
		String uploadFolderPath = getFolder();
		Member memberEntity = (Member) session.getAttribute("principal");
		int id = memberEntity.getId();
		System.out.println("member Id"+memberEntity.getId());
		String filename = "";
		File uploadPath = new File(uploadFolder, uploadFolderPath);
		if (uploadPath.exists() == false) {
			uploadPath.mkdirs();
		}
	         UUID uuid = UUID.randomUUID();
	         String uploadFileName = uuid.toString() + "_" + file.getOriginalFilename();
	         File saveFile = new File(uploadFolder, uploadFileName);
	         System.out.println(uploadPath);
	         System.out.println(uploadFileName);
	         filename = uploadFolder+"\\"+uploadFileName;
	         file.transferTo(saveFile);
	         filename = ".\\postImages\\"+uploadFileName;
	         memberService.updateImage(id, filename);
		return new ResponseEntity<String>("ok", HttpStatus.CREATED);
	}
	private String getFolder() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String str = sdf.format(date);
		return str.replace("-", File.separator);
	}
}
