import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
//import Mypost from '../components/Mypage/Mypost';
import { Avatar } from '@material-ui/core';
//import db from '../firebase';
import { useParams } from 'react-router';

//import Subscribe from '../components/Detail/DetailFunction/Subscribe';
const Container = styled.div`
    position: relative;
    z-index: 1;
    margin-bottom: 14px;
    margin-top: -20px;
`;
const BackgroundImage = styled.div`
    width: 100%;
    height: 787px;
    background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 100) 0,
            rgba(25, 25, 25, 0) 20%,
            rgba(25, 25, 25, 0) 20%,
            rgba(0, 0, 0, 0) 66.66%,
            rgba(0, 0, 0, 0) 66.66%,
            rgba(0, 0, 0, 50) 100%
        ),
        url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
`;
const Username = styled.p`
    font-weight: 500;
    font-size: 24px;
    line-height: 35px;
    letter-spacing: -0.48px;
    margin-top: 12px;
    margin-bottom: 20px;
`;
const IntroductionFont = styled.p`
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 35px;
    text-align: left;
    letter-spacing: -0.48px;
    color: #ffffff;
`;
function UserPage(props) {
    const { friendid } = useParams();
    const [userinfo, setUserInfo] = useState('');
/*
    useEffect(() => {
        db.collection('users')
            .doc(friendid)
            .get()
            .then((doc) => {
                setUserInfo(doc.data());
            });
    }, []);
    */
   
    return (
        <div>
            <Container>
                <BackgroundImage bg={"/images/userbgimg.jpg"}/>
                {/* <BackgroundImage bg={userinfo.background} /> */}
            </Container>
            <div
                style={{
                    display: 'flex',
                    marginLeft: '10%',
                    marginTop: '-5%',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <div
                    style={{
                        width: '200px',
                        height: 'auto',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Avatar
                        src={userinfo.photoURL}
                        alt={''}
                        style={{
                            width: '200px',
                            height: '200px',
                            border: '2px solid #E44E47',
                            boxSizing: 'border-box',
                        }}
                    />
                     <Username>용용이</Username> {/*{userinfo.displayName} */}
                    {/* <Subscribe userTo={friendid} Type="FollowPage" /> */}
                </div>
                <div
                    style={{
                        display: 'flex',
                        maxWidth: '380px',
                        alignItems: 'center',
                        marginLeft: '65px',
                    }}
                >
                    <div>
                        <IntroductionFont>인트로듀스 마이쉘</IntroductionFont>
                        <IntroductionFont
                            style={{
                                marginTop: '20px',
                                wordBreak: 'break-all',
                                fontWeight: '300',
                            }}
                        >
                            여긴 나에 대한 정보가 들어있어요
                            {/* {userinfo.introduction} */}
                        </IntroductionFont>
                    </div>
                </div>
            </div>
            {/* <Mypost uid={userinfo.uid} /> */}
        </div>
    );
}
export default UserPage;
