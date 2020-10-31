package com.hjk.triplix.domain.board;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hjk.triplix.domain.comment.Comment;
import com.hjk.triplix.domain.good.Good;
import com.hjk.triplix.domain.member.Member;
import com.hjk.triplix.domain.pick.Pick;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString(exclude = "member")
public class Board {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(length = 100)
	private String bTitle;
	
	@Column(length = 100000)
	private String bContent;
	
	@Column(length = 100000)
	private String bLocation;
	
	@Column(length = 100000)
	private String bImage;
	
	@CreationTimestamp
	private Timestamp bCreatedate;
	
	@JsonIgnoreProperties({"board"})
	@JoinColumn(name = "memberId")
	@ManyToOne
	private Member member;

	@JsonIgnoreProperties({"board"}) 
	@OneToMany(mappedBy = "board", fetch=FetchType.EAGER)
	private List<Comment> comment;
	
	@JsonIgnoreProperties({"board"})
	@OneToMany(mappedBy = "board", fetch=FetchType.LAZY)
	private List<Good> good;
	
	@JsonIgnoreProperties({"board"})
	@OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
	private List<Pick> pick;
}
