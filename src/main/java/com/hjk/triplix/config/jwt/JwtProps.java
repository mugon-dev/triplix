package com.hjk.triplix.config.jwt;

interface JwtProps{
	String secret = "비밀키";
	String auth = "Bearer ";
	String header = "Authorization";
}
