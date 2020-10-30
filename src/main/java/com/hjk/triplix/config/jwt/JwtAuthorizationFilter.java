package com.hjk.triplix.config.jwt;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.domain.member.MemberRepository;

public class JwtAuthorizationFilter implements Filter {

	private MemberRepository memberRepository;

	public JwtAuthorizationFilter(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		System.out.println("JwtAuthorizationFilter 작동");
		
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		
		String jwtToken = req.getHeader(JwtProps.header);
		
		if(jwtToken == null) {
			PrintWriter out = resp.getWriter();
			out.print("jwtToken not found");
			out.flush();
		} else { 
			jwtToken = jwtToken.replace(JwtProps.auth, "");
			try {
				int id = JWT.require(Algorithm.HMAC512(JwtProps.secret)).build().verify(jwtToken).getClaim("id").asInt();
				System.out.println("jwt id: "+id);
				HttpSession session = req.getSession();
				Member memberEntity = memberRepository.findById(id).get();
				session.setAttribute("principal", memberEntity);
				System.out.println("필터타기");
				chain.doFilter(request, response);
			}catch (Exception e) {
				// TODO: handle exception
					PrintWriter out = resp.getWriter();
					out.print(e.getMessage());
					out.print("verify fail");
					out.flush();
			}
		}
	}
}
