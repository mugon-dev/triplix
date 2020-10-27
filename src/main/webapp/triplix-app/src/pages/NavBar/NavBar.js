import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';
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

const BackColor = {
    backgroundColor : "rgba(64, 64, 64, 0.7)"
}


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton style={BackColor}>
                <Modal.Title id="contained-modal-title-vcenter">
                    글 등록
        </Modal.Title>
            </Modal.Header>
            <Modal.Body style={BackColor}>
                <Form.Label>글 제목</Form.Label>
                <Form.Control type="text" placeholder="글 제목" />
                <Form.Label>글 내용</Form.Label>
                <Form.Control as="textarea" rows={10} />
            </Modal.Body>
            <Modal.Footer style={BackColor}>
                <Button onClick={BoardRegister}>등록</Button>
                <Button onClick={props.onHide}>취소</Button>
            </Modal.Footer>
        </Modal>
    );
}

 const BoardRegister = () => {
        fetch().then().then();
    }

    const [modalShow, setModalShow] = React.useState(false);
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

                    <>
                        <RegisterText to={'/login'}>로그인</RegisterText>
                        <div>|</div>
                        <RegisterText to={'/register'}>
                            회원가입
                            </RegisterText>
                        <div>|</div>

                        <RegisterText onClick={() => setModalShow(true)}>
                            글등록
                        </RegisterText>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {<Avatar

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
                            {<Avatar
                                src={user.photoURL}
                                alt={user.displayName}
                                onClick={() =>
                                    history.push(`/user/${user.uid}`)
                                }
                                style={{ cursor: 'pointer' }}
                            />}
                        <Label>로그아웃</Label>
                    </div>
                    
                    </div>
                </RegisterContainer>
            </Container>

        </MarginContainer>
    );
};
