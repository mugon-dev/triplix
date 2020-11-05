package com.hjk.triplix.domain.comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface CommentRepository extends JpaRepository<Comment, Integer> {

	@Query(value = "SELECT * FROM comment WHERE boardId = :bid", nativeQuery = true)
	List<Comment> mFindbyBoardId(int bid);
}
