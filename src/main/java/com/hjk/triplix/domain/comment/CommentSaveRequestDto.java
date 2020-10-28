package com.hjk.triplix.domain.comment;

import lombok.Data;

@Data
public class CommentSaveRequestDto {
	private String comment;
	public static Comment toEntity(CommentSaveRequestDto dto) {
		Comment comment = Comment.builder()
				.comment(dto.getComment()).build();
		return comment;
	}

}
