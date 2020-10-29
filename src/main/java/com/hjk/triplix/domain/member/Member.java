package com.hjk.triplix.domain.member;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hjk.triplix.domain.board.Board;
import com.hjk.triplix.domain.comment.Comment;

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
	private String mid;
	
	@Column(length = 50)
	private String mpw;
	
	@Column(length = 50)
	private String mname;
	
	@Column(length = 50)
	private String memail;
	
	@Column(length = 1000000)
	private byte[] mprofile;
	
	@JsonIgnoreProperties({"member","bcontent"})
	@OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
	private List<Board> boards;

}
