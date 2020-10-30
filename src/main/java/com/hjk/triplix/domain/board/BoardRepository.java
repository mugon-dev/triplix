package com.hjk.triplix.domain.board;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BoardRepository extends JpaRepository<Board, Integer> {

	@Query(value = "select * from board where memberId = :memberId", nativeQuery = true)
	List<Board> findAllMemberId(int memberId);
}
