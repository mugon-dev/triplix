package com.hjk.triplix.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.hjk.triplix.config.filter.CorsFilter;
import com.hjk.triplix.config.jwt.JwtAuthenticationFilter;
import com.hjk.triplix.config.jwt.JwtAuthorizationFilter;
import com.hjk.triplix.domain.member.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class FilterConfig {
	
	private final MemberRepository memberRepository;
	
	
	 @Bean 
	 public FilterRegistrationBean<CorsFilter> corsFilter(){
		System.out.println("CORS 필터 등록"); FilterRegistrationBean<CorsFilter> bean =
		new FilterRegistrationBean<>(new CorsFilter()); bean.addUrlPatterns("/*");
	 	bean.setOrder(0); 
	 	return bean; 
	 	}
	 
	
	@Bean
	public FilterRegistrationBean<JwtAuthenticationFilter> jwtAuthenticationFilter(){
		System.out.println("JwtAuthenticationFilter 필터 등록");
		FilterRegistrationBean<JwtAuthenticationFilter> bean = new FilterRegistrationBean<>(new JwtAuthenticationFilter(memberRepository));
		bean.addUrlPatterns("/member/login");
		bean.setOrder(1);
		return bean;
	}
	
	@Bean
	public FilterRegistrationBean<JwtAuthorizationFilter> jwtAuthorizationFilter(){
		System.out.println("JwtAuthorizationFilter 필터 등록");
		FilterRegistrationBean<JwtAuthorizationFilter> bean = new FilterRegistrationBean<>(new JwtAuthorizationFilter(memberRepository));
		bean.addUrlPatterns("/member/update/*");
		bean.addUrlPatterns("/member/image/*");
		bean.addUrlPatterns("/member/profile/*");
		bean.addUrlPatterns("/member/delete/*");
		bean.addUrlPatterns("/member/detail/*");
		bean.addUrlPatterns("/board/delete/*");
		bean.addUrlPatterns("/board/my/*");
		bean.addUrlPatterns("/board/update/*");
		bean.addUrlPatterns("/board/save");
		bean.addUrlPatterns("/comment/save/*");
		bean.addUrlPatterns("/good/save");
		bean.addUrlPatterns("/good/delete");
		bean.setOrder(2);
		return bean;
	}
}
