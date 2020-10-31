package com.hjk.triplix.domain.pick;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface PickRepository extends JpaRepository<Pick, Integer>{

	@Query(value = "SELECT * FROM pick WHERE memberId = :mid and boardId = :bid", nativeQuery = true)
	Pick mFindMyId(int mid, int bid);
}
