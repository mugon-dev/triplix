import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { SignUpLabel } from '../components/CommonStyle/SignUpLabel';
import { BackgroundBox } from '../components/CommonStyle/BackgroundBox';
import { InputBar } from '../components/CommonStyle/InputBar';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { SubmittBtn } from '../components/CommonStyle/SubmittBtn';


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

const Login = () => {

	// const [, dispatch] = useStateValue();
    // const [ID, setID] = useState('');
    // const [Password, setPassword] = useState('');
    // const history = useHistory();
    const onLoginHandler = (event) => {
        event.preventDefault();
    };



	return (
		<div
			style={{
				overflow: 'hidden',
				width: '100%',
				height: '100vh',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
			}}
		>
			{/* <KeyboardBackspaceIcon
				onClick={() => {
					history.goBack();
				}}
				fontSize="large"
				style={{
					position: 'absolute',
					paddingTop: '75px',
					marginLeft: '75px',
					display: 'flex',
					cursor: 'pointer',
					width: '50px',
					height: '50px',
					textAlign: 'left',
					color: 'white',
				}}
			/> */}
			<LoginLabel>방문해주셔서 감사합니다</LoginLabel>
			<SignUpLabel style={{ marginTop: '2%' }}>
				<img
					style={{ marginRight: '30px' }}
					src="/images/Logo.png"
					alt="Logo"
				/>
                    &nbsp;로그인
                </SignUpLabel>

			<BackgroundBox style={{ height: '516px', marginTop: '-3%' }}>

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
						style={{ height: '17%' }}
						placeholder="아아디"
						type="text"
						// value={ID}
						// onChange={(e) => setID(e.currentTarget.value)}
					/>
					<InputBar
						style={{ height: '17%', marginTop: '-3%' }}
						placeholder="비밀번호"
						type="password"
						// value={Password}
						// onChange={(e) => setPassword(e.currentTarget.value)}
					/>
					<p
						style={{
							width: '86%',
							marginTop: '-5%',
							textAlign: 'right',
						}}
					>
						비밀번호찾기
                        </p>
					<SubmittBtn
						style={{ height: '17%', marginTop: '-2%' }}
						onClick={onLoginHandler}
					>
						Traview 로그인
                        </SubmittBtn>

					<IDCheckLabel>
						<p>아이디가 없으신가요?&nbsp;&nbsp; </p>
						{/* <Link style={{ color: 'red' }} to={'/register'}>
							&nbsp;가입하기
                            </Link> */}
					</IDCheckLabel>
				</form>
			</BackgroundBox>
		</div>
	);
};

export default Login;