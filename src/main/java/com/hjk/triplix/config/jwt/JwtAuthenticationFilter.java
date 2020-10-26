package com.hjk.triplix.config.jwt;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.domain.member.MemberRepository;

public class JwtAuthenticationFilter implements Filter{

	private MemberRepository memberRepository;
	
	public JwtAuthenticationFilter(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		System.out.println("JwtAuthenticationFilter");
		
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		PrintWriter out = resp.getWriter();
		
		String method = req.getMethod();
		System.out.println(method);
		
		if(!method.equals("POST")) {
			out.print("required post method");
			out.flush();
		}else {
			ObjectMapper om = new ObjectMapper();
			try {
				Member member = om.readValue(req.getInputStream(), Member.class);
				Member memberEntity = memberRepository.mFindByIdAndPw(member.getMid(), member.getMpw());

				if(memberEntity == null) {
					out.print("fail");
					out.flush();
				}else {
					System.out.println("인증되었습니다.");
					HttpSession session = req.getSession();
					session.setAttribute("principal", memberEntity);

					String jwtToken = JWT.create()
											.withSubject("토큰제목")
											.withExpiresAt(new Date(System.currentTimeMillis()+1000*60*60))
											.withClaim("mid", memberEntity.getMid())
											.withClaim("id", memberEntity.getId())
											.sign(Algorithm.HMAC512(JwtProps.secret));
					
					resp.addHeader(JwtProps.header, JwtProps.auth+jwtToken);
					out.print("ok");
					out.flush();			
				}
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println("오류 : " + e.getMessage());
			}
		}
		
	}

}
