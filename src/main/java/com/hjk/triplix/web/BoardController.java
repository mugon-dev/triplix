package com.hjk.triplix.web;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {
	
	@PostMapping("/board/register")
	public String a(String aaa) {
		System.out.println("!");
		return aaa;
	}
}
