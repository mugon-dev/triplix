# triplix

## member 관련 기능

### member/login
- 로그인 기능
- post, mid, mpw
- 실패 : fail
- return 회원번호, 아이디
- jwt 생성

### member/register
- 회원가입
- post 호출
- mid, memail, mname, mprofile, mpw 요구
- 성공 : ok

### member/logout
- session 삭제

### member/update
- jwt 필요
- post 호출
- memail, mprofile, mpw 변경 가능
- 성공 : ok

### member/delete
- jwt 필요
- post 호출
- 성공 : ok 

### member/detail
- jwt 필요
- get 호출
- 성공 : member 객체 
- id,mid,mpw,mname,memail,mprofile