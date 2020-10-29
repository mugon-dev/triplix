package com.hjk.triplix.domain.good;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hjk.triplix.domain.board.Board;
import com.hjk.triplix.domain.member.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Good {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@JoinColumn(name = "boardId")
	@ManyToOne(fetch = FetchType.LAZY)
	private Board board;
	
	@JsonIgnoreProperties({"boards"})
	@JoinColumn(name = "memberId")
	@OneToOne(fetch = FetchType.LAZY)
	private Member member;
	
	

}
