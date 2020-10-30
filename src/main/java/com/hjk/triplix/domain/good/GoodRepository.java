package com.hjk.triplix.domain.good; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hjk.triplix.domain.member.Member;

public interface GoodRepository extends JpaRepository<Good, Integer> {

	@Query(value = "SELECT * FROM good WHERE memberId = :mid and boardId = :bid", nativeQuery = true)
	Good mFindMyId(int mid, int bid);
	
}
