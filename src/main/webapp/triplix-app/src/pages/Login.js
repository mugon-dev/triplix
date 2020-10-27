import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { SignUpLabel } from '../components/CommonStyle/SignUpLabel';
import { BackgroundBox } from '../components/CommonStyle/BackgroundBox';
import { InputBar } from '../components/CommonStyle/InputBar';
import { useHistory, Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { SubmittBtn } from '../components/CommonStyle/SubmittBtn';
import { useDispatch } from 'react-redux';
import { login } from '../store';


const LoginLabel = styled.div`
    margin-top: 5%;
    font-weight: 300;
    font-size: 30px;
    line-height: 43px;
	color: #ffffff;
`;

const IDCheckLabel = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 87%;
    margin-top: -2%;
    letter-spacing: -1px;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
`;

const Login = (props) => {

	const dispatch = useDispatch();

	const [member, setMember] = useState({
		mid: "",
		mpw: ""
	});

	const onLoginHandler = (event) => {
		event.preventDefault();
		fetch("http://localhost:8000/member/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(member)
		})
			.then(res => {
				//로컬 스토리지 저장
				for (let header of res.headers.entries()) {
					if (header[0] === "authorization") {
						localStorage.setItem("Authorization", header[1]);
					}
				}
				return res.text();
			})
			.then(res => {
				if (res === "ok") {
					// 로그인 상태 값 리덕스 저장
					dispatch(login());
					props.history.push("/");
				} else {
					alert('아이디 혹은 비번을 다시 입력하세요!');
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
			<LoginLabel>방문해주셔서 감사합니다</LoginLabel>
			<SignUpLabel style={{ marginTop: '2%' }}>
				{/* <img
					style={{ marginRight: '30px' }}
					src="/images/Logo.png"
					alt="Logo"
				/> */}
                    &nbsp;로그인
                </SignUpLabel>

			<BackgroundBox style={{ height: '500px', marginTop: '3%' }}>

				<form
					onSubmit={onLoginHandler}
					style={{
						height: '70%',
						display: 'flex',
						justifyContent: 'space-around',
						flexDirection: 'column',
					}}
				>
					<InputBar
						style={{ height: '17%', marginTop: '10%' }}
						placeholder="아아디"
						type="text"
						name="mid"
						onChange={changeValue}
					/>
					<InputBar
						style={{ height: '17%', marginTop: '-1%' }}
						placeholder="비밀번호"
						type="password"
						name="mpw"
						onChange={changeValue}
					/>
					{/* <p
						style={{
							width: '86%',
							marginTop: '-5%',
							textAlign: 'right',
						}}
					>
						비밀번호찾기
                        </p> */}
					<SubmittBtn
						style={{ height: '17%', marginTop: '2%' }}
						onClick={onLoginHandler}
					>
						Traview 로그인
                        </SubmittBtn>

					<IDCheckLabel>
						<p>아이디가 없으신가요?&nbsp;&nbsp;
						<Link style={{ color: 'red' }} to={'/register'} >
								&nbsp;가입하기
                            </Link></p>
					</IDCheckLabel>
				</form>
			</BackgroundBox>
		</div>
	);
};

export default Login;