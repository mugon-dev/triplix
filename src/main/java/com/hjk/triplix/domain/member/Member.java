package com.hjk.triplix.domain.member;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Member {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(unique = true, length = 50)
	private String mId;
	
	@Column(length = 50)
	private String mPw;
	
	@Column(length = 50)
	private String mName;
	
	@Column(length = 50)
	private String mEmail;
	
	@Column(length = 1000000)
	private String mProfile;

}
