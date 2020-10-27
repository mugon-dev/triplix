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
- get 호출
- session 삭제

### member/update
- jwt 필요
- put 호출
- memail, mprofile, mpw 변경 가능
- 성공 : ok

### member/delete
- jwt 필요
- delete 호출
- 성공 : ok 

### member/detail
- jwt 필요
- get 호출
- 성공 : member 객체 
- id,mid,mpw,mname,memail,mprofile

## board 관련 기능

### board/
- get 호출
- board 전체 리스트 

### board/{id}
- get 호출
- board 하나

### board/delete/{id}
- delete
- jwt 필요
- 같은 작성자일 때 삭제 가능
- board 하나 삭제

### board/save
- post
- jwt 필요
- btitle,bcontent
### board/update/{id}
- put
- jwt 필요
- btitle,bcontent
