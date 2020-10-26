package com.hjk.triplix.domain.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepository extends JpaRepository<Member, Integer>{

	@Query(value = "SELECT * FROM member WHERE mId = :mId and mPw = :mPw", nativeQuery = true)
	Member mFindByIdAndPw(String mId, String mPw);

}
