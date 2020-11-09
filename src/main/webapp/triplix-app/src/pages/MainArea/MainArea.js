import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Picture from './Picture';
//import db from '../../firebase';
import FlipMove from 'react-flip-move';

import styled from 'styled-components';
import Loader from './Loader';
import './MainGrid.css';

const MarginContainer = styled.div`
    max-width: 1440px;
    margin: auto;
    margin-top: 90px;
`;

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
`;

const Title = styled.h4`
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 43px;
    letter-spacing: -0.6px;
`;

const MoodList = styled.ul`
    display: flex;
`;

const Mood = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 80px;
    height: 46px;
    margin-left: 20px;
    box-sizing: border-box;
    color: ${(props) => (props.active ? '#ff534b' : '')};
    cursor: pointer;

    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 35px;
    letter-spacing: -0.48px;

    &:hover {
        color: #ff534b;
        transition: color 300ms ease-out;
    }
`;

const Container = styled.div`
    width: 1440px;
    margin: 36px 0;
    columns: 3;
    column-gap: 40px;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [posts, setPosts] = useState([]);
    const [last, setLast] = useState(null);
    const [mood, setMood] = useState('');
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/board/")
        .then((res)=>res.json())
        .then((res)=>{
            setPosts(res);
            console.log("aaa",res);
        });
    },()=>posts);

    return (
        <MarginContainer>
            <HeaderContainer>
                <Title>TRIPLIX LIST</Title>
                <br/><br/>
               
            </HeaderContainer>

             <InfiniteScroll
                dataLength={posts.length}
                // next={(mood && moodNext) || next}
                hasMore={hasMore}
                loader={<Loader />}
            > 
                <Container>
                     <FlipMove>

                        {posts.map(({ post, id, btitle, bcontent, member, comment ,bimage,bId,good, latitude,longitude, pick, bgoodNum }) => (
                            <Picture
                            id={member.id}
                            name={member.mname}
                            bId={id}
                            title={btitle}
                            content={bcontent}
                            member={member}
                            image={bimage}
                            good={good}
                            pick={pick}
                            comment={comment}
                            latitude={latitude}
                            longitude={longitude}
                            goodnum={bgoodNum}
                            />
                        ))}
                        
                    </FlipMove> 
                </Container>
            </InfiniteScroll>
        </MarginContainer>
    );
};
