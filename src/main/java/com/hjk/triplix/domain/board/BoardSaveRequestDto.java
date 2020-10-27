package com.hjk.triplix.domain.board;

import lombok.Data;

@Data
public class BoardSaveRequestDto {
	private String bTitle;
	private String bContent;
	public static Board toEntity(BoardSaveRequestDto dto) {
		Board board = Board.builder()
				.bTitle(dto.getBTitle())
				.bContent(dto.getBContent()).build();
		return board;
	}

}
