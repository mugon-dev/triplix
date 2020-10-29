import React from 'react';
import styled from 'styled-components';
//import Avartar from './Avartar';
// const Avartar = styled.div`
//     border-radius: 20px;
//     width:40px;
//     height:40px;
//     background-image: url(${(props) => props.bg});
//     background-size: cover;
//     background-position: center center;
//     background repeat: no-repeat;
//     margin-right:20px;
// `;
const UserMessage = styled.p`
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    display: flex;
    align-items: center;
`;



function Message(props) {
    
    // console.log(props);
    // console.log("전체 값인뎁쇼"+props);
    // console.log("선생님 여기에요!"+props.mname);
    // console.log("댓글이에요!"+props.comment);
    return (
        <div
            style={{
                display: 'flex',
                marginBottom: '40px',
                alignItems: 'center',
            }}
        >
             {/* <Avartar uid={props.uid} Type="comment" /> */}
            <UserMessage style={{ marginRight: '20px' }}>
                {props.mname}
            </UserMessage>
            <UserMessage style={{ fontWeight: 300 }}>
                {props.comment}
            </UserMessage>
        </div>
    );
}

export default Message;
