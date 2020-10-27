# triplix

## member/login
- 로그인 기능
- post, mid, mpw
- 실패 : fail
- return 회원번호, 아이디

## member/register
- 회원가입
- mid, memail, mname, mprofile, mpw 요구
- 성공 : ok

## member/logout
- session 삭제

## member/update
- jwt 토큰 필요
- memail, mprofile, mpw 변경 가능
- 성공 : ok