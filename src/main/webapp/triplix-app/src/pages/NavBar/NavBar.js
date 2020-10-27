import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../store';

const MarginContainer = styled.div`
    max-width: 1440px;
    margin: auto;
`;

const Container = styled.header`
    position: relative;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 0;
`;

const Title = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    font-style: normal;
    font-weight: 900;
    font-size: 34px;
    line-height: 49px;
    color: #ff534b;
`;

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RegisterText = styled(Link)`
    text-decoration: none;
    padding: 15px;
    cursor: pointer;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.28px;
    color: #ffffff;

    &:hover {
        color: #ff534b;
    }
`;

const Input = styled.input`
    flex: 1;
    color: #ffffff;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: -0.32px;
`;

const SearchBtn = styled.button`
    color: #ff534b;
    background-color: transparent;
    border: none;
    outline: none;
`;

const SearhContainer = styled.form`
    width: 50%;
    display: flex;
    border: 2px solid #ff534b;
    border-radius: 40px;
    padding: 5px 10px;
    align-items: center;
`;

const Label = styled.span`
    margin-top: 4px;
    cursor: pointer;
    font-size: 16px;
    letter-spacing: -0.32px;
    font-weight: 500;
    color: #ff534b;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const isLogin = useSelector((store) => store.isLogin);
	const dispatch = useDispatch();

	const logoutProc = () =>{
		localStorage.removeItem("Authorization");
		dispatch(logout());
	}
    const [area, setArea] = useState('');

    return (
        <MarginContainer>
            <Container>
                <Title to={'/'}>
                    <img src="/images/NavbarLogo.png" alt="Logo" />
                </Title>
                <SearhContainer>
                    <Input
                        type="text"
                        placeholder="지역을 검색해보세요! ex. 서울 부산 ..."
                        value={area}
                        onChange={(e) => setArea(e.currentTarget.value)}
                    />
                </SearhContainer>

                <RegisterContainer>

                    { isLogin ?
                    (
                        <Link onClick={logoutProc}>로그아웃</Link>
                        
                    )
                    :
                    (
                       <>
                            <RegisterText to={'/login'}>로그인</RegisterText>
                            <div>|</div>
                            <RegisterText to={'/register'}>
                                회원가입
                            </RegisterText>
                        </>
                    )
                    }



                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {/*<Avatar
                                src={user.photoURL}
                                alt={user.displayName}
                                onClick={() =>
                                    history.push(`/user/${user.uid}`)
                                }
                                style={{ cursor: 'pointer' }}
                            />*/}
                         
                        </div>
                </RegisterContainer>
            </Container>
        </MarginContainer>
    );
};
