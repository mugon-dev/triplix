import React, { useState } from 'react';
import { TopLabel } from '../../components/CommonStyle/TopLabel';
import { SignUpLabel } from '../../components/CommonStyle/SignUpLabel';
import { BackgroundBox } from '../../components/CommonStyle/BackgroundBox';
import { InputBar } from '../../components/CommonStyle/InputBar';
import { SubmittBtn } from '../../components/CommonStyle/SubmittBtn';


const Register = (props) => {

	const [member,setMember]=useState({
		memail:"",
		mid:"",
		mname:"",
		mpw:""
	});


	const onSignUpHandler =(e)=>{
		e.preventDefault();
		fetch("http://localhost:8000/member/register",{
			method:"POST",
			headers:{
				"Content-Type": "application/json; charset=utf-8"
			},
			body:JSON.stringify(member)
		})
		.then(res=>res.text())
		.then(res=>{
			if(res==="ok"){
				 props.history.push("/login");
			}else{
				alert('회원가입 실패');
			}

		});
	}
	
	const changeValue = (e) => {
		setMember({
			...member,
			[e.target.name]: e.target.value
		});
	}

	return (
		<div
                style={{
                    overflow: 'hidden',
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
            >
                <TopLabel style={{ marginBottom: '1.5%' }}>
                    나만 몰랐던 국내 여행지
                </TopLabel>
                <SignUpLabel style={{ marginBottom: '3%' }}>
                    {/* <img
                        style={{ marginRight: '30px' }}
                        src="/images/Logo.png"
                        alt="Logo"
                    /> */}
                    &nbsp;회원가입
                </SignUpLabel>

                <BackgroundBox style={{ marginTop: '-2%' }}>
                    <form
                        onSubmit={onSignUpHandler}
                        style={{
                            height: '70%',
                            display: 'flex',
                            justifyContent: 'space-around',
                            flexDirection: 'column',
                        }}
                    >
                        <InputBar
                            placeholder="e-mail"
							type="email"
							name="memail"
                            // value={Email}
                            onChange={changeValue}
                        />
                        <InputBar
                            placeholder="아이디"
							type="text"
							name="mid"
                            // value={Id}
                            onChange={changeValue}
                        />
                        <InputBar
                            placeholder="이름"
							type="text"
							name="mname"
                            // value={Name}
                            onChange={changeValue}
                        />
                        <InputBar
                            placeholder="비밀번호"
							type="password"
							name="mpw"
                            // value={Password}
                            onChange={changeValue}
                        />
                        <SubmittBtn onClick={onSignUpHandler}>
                            Triplix 시작하기
                        </SubmittBtn>
                    </form>
                </BackgroundBox>
            </div>
	);
};

export default Register;