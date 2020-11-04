import React, { useState } from 'react';
import { TopLabel } from '../../components/CommonStyle/TopLabel';
import { SignUpLabel } from '../../components/CommonStyle/SignUpLabel';
import { BackgroundBox } from '../../components/CommonStyle/BackgroundBox';
import { InputBar } from '../../components/CommonStyle/InputBar';
import { SubmittBtn } from '../../components/CommonStyle/SubmittBtn';
import { MainTheme } from '../../components/CommonStyle/MainTheme';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { SocialCollection } from '../../components/CommonStyle/SocialCollection';
import { SocialBox } from '../../components/CommonStyle/SocialBox';
import { SocialFont } from '../../components/CommonStyle/SocialFont';
import { SocialImage } from '../../components/CommonStyle/SocialImage';


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
        <MainTheme bg={'/images/registerbg.jpg'}>
		<div
                style={{
                    overflow: 'hidden',
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
            >

                <TopLabel style={{ marginBottom: '1.5%' }}>
                    너 우리 동료가 되어라
                </TopLabel>
                <SignUpLabel style={{ marginBottom: '3%' }}>
                     <img
                        style={{ marginRight: '30px' }}
                        src="/images/NavbarLogo.png"
                        alt="Logo"
                    /> 
                    &nbsp;회원가입
                </SignUpLabel>

                <BackgroundBox style={{ marginTop: '-2%' }}>

{/*소셜 로그인 박스*/}
<SocialCollection
                        style={{
                            marginBottom: '-20px',
                        }}
                    >
                        <SocialBox>
                            <SocialImage bg={'/images/kakao.png'} />
                            <SocialFont>
                                카카오 아이디로
                                <br /> 회원가입
                            </SocialFont>
                        </SocialBox>
                        <SocialBox>
                            <SocialImage bg={'/images/naver.png'} />
                            <SocialFont>
                                네이버 아이디로
                                <br /> 회원가입
                            </SocialFont>
                        </SocialBox>
                        <SocialBox>
                            <SocialImage
                                style={{
                                    background: ' #3B5998',
                                    borderRadius: '35px',
                                }}
                            >
                                <img
                                    src="/images/facebook.png"
                                    alt="Facebook"
                                />
                            </SocialImage>
                            <SocialFont>
                                페이스북 아이디로
                                <br /> 회원가입
                            </SocialFont>
                        </SocialBox>
                        <SocialBox>
                            <SocialImage
                                bg={'/images/google.png'}
                                alt="Google"
                            />
                            <SocialFont>
                                구글 아이디로
                                <br /> 회원가입
                            </SocialFont>
                        </SocialBox>
                    </SocialCollection>
                    {/*inputBox Div*/}

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
                            placeholder="아이디를 입력하세요"
							type="text"
							name="mid"
                            // value={Id}
                            onChange={changeValue}
                        />
                        <InputBar
                            placeholder="비밀번호를 입력하세요"
							type="password"
							name="mpw"
                            // value={Password}
                            onChange={changeValue}
                        />
                        <InputBar
                            placeholder="닉네임을 입력하세요"
							type="text"
							name="mname"
                            // value={Name}
                            onChange={changeValue}
                        />
                        <InputBar
                            placeholder="이메일을 입력하세요"
							type="email"
							name="memail"
                            // value={Email}
                            onChange={changeValue}
                        />
                        <SubmittBtn onClick={onSignUpHandler}>
                            TRIPLIX 회원가입
                        </SubmittBtn>
                    </form>
                </BackgroundBox>
            </div>
            </MainTheme>
	);
};

export default Register;