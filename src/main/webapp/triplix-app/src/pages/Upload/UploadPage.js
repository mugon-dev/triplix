import React, { useEffect, useState } from 'react';
import {
    TotalContainer,
    UploadDropZone,
    RightContainer,
    TitleInputBar,
    AdvertisementComponent,
    AtmosphereComponent,
    LocationComponent,
    RatingComponent,
} from './UploadStyled';
import Dropzone from './UploadFunction/Dropzone';
import TitleName from './UploadFunction/TitleName';
import Advertisement from './UploadFunction/advertisement';
import Atmosphere from './UploadFunction/Atmosphere';
import Rating from './UploadFunction/Rating';
import Address from './UploadFunction/Address';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
import { useSelector } from 'react-redux';

export default function UploadPage(props) {
    //유저 정보
    const [userId, setUserId] = useState();
    //유저 상태
    const isLogin = useSelector((store)=> store.isLogin);

    const [advertising, setAdvertising] = useState(
        props.advertising ? props.advertising : false
    ); //광고여부
    const [mood, setMood] = useState(props.mood ? props.mood : ''); //분위기
    const [rating, setRating] = useState(props.rating ? props.rating : ''); //평점
    const [btitle, setBtitle] = useState(props.btitle ? props.btitle : null); //제목명
    const [bcontent, setBcontent] = useState(props.bcontent ? props.bcontent : null); //상세내용
    const [bimage, setBimage] = useState(
        props.bimage ? props.bimage : null
    ); //이미지
//     useEffect(() => {
//         //토큰 가져오기
//         if(props.match.params.id!=null){
// 		fetch("http://localhost:8000/board/"+props.match.params.id, {
// 			method: "GET",
// 			headers:{
// 				"Authorization": localStorage.getItem("Authorization")
// 			}
// 		}).then(res=>res.json()).then(res=>{
// 			setBtitle(props.btitle ? props.btitle : null);
//             setBcontent(props.bcontnet ? props.bcontent : null);
//             setBimage(props.bimage ? props.bimage : null); 
//         });
//     }
//         setAdvertising(props.advertising ? props.advertising : false);
//         setMood(props.mood ? props.mood : '');
//         setRating(props.rating ? props.rating : '');
        
//     }, []);

    const changeValue = (e) => {
        console.log(e);
        console.log({[e.target.name]: e.target.value});
        console.log(bimage);
        // setPost({
        //     ...post,
        //     [e.target.name]: e.target.value
        // });
    }

    const onHandleUpload = (e) => {
        e.preventDefault();
        if (
            bimage === null || //이미지업로드 X
            btitle === null || //제목이(x)
            bcontent === null //상세내용x
            //mood === '' || //분위기가(X)
            //area === null || //지역체크(위치X)
            //rating === '' //평점(X)
                       
        ) {
            alert('업로드내용을 입력해주세요');
        } else {
            //업로드 fetch , bimage, btitle, bcontent
            fetch(  ).then().then();
            console.log(1, btitle);
            console.log(2, bcontent);
            alert('업로드 완료');
            props.close();
        }
    };
    const onHandleUpdate = (e) => {
        e.preventDefault();
        if (
            bimage === null || //이미지업로드 X
            btitle === null || //제목이(x)
            bcontent === null || //상세내용x
            mood === '' || //분위기가(X)
            //area === null || //지역체크(위치X)
            rating === '' //평점(X)
        ) {
            alert('업로드내용을 입력해주세요');
        } else {
            //수정
            // let PostInfoChange = db.collection('posts').doc(props.id);
            // PostInfoChange.update({
            //     advertising: advertising, //광고
            //     area: area, //지역
            //     avatar: user.photoURL, //아바타
            //     imageUrl: imageUrl, //이미지
            //     latitude: latitude, //위도
            //     longitude: longitude, //경도
            //     mood: mood, //분위기
            //     rating: rating, //평점
            //     review: review, //리뷰
            //     timestamp: firebase.firestore.FieldValue.serverTimestamp(), //시간
            //     title: title, //제목
            //     address: address, //주소
            // }).then((temp) => alert('게시물이 수정되었습니다.'));

            // props.close();
        }
    };
  
    return (
        <Dialog
            scroll={'body'}
            maxWidth={false}
            open={props.open}
            onClose={props.close}
            aria-labelledby="form-dialog-title"
            PaperProps={{
                style: {
                    backgroundColor: 'rgba(64, 64, 64, 0.7)',
                    backdropFilter: 'blur(30px)',
                    borderRadius: '20px',
                    color: '#ffffff',
                },
            }}
        >
            <form>
                <TotalContainer style={{ paddingTop: '30px' }}>
                    <UploadDropZone>
                        <Dropzone
                            bimage={bimage}
                            setHadImageurl={setBimage}
                                                 
                        />
                    </UploadDropZone>
                    <RightContainer>
                        <TitleInputBar>
                            <TitleName
                                btitle={btitle}
                                bcontent={bcontent}
                                setHadTitlename={setBtitle}
                                setHadReview={setBcontent}
                               
                            />
                        </TitleInputBar>
                        <AdvertisementComponent>
                            <Advertisement />
                        </AdvertisementComponent>
                        <AtmosphereComponent>
                            <Atmosphere />
                        </AtmosphereComponent>
                        <LocationComponent>
                            <Address/>
                        </LocationComponent>
                        <div
                            style={{
                                marginTop: '-20px',
                                background: 'white',
                                maxWidth: '510px',
                                overflow: 'auto',
                                maxHeight: '140px',
                            }}
                        >
                           
                        </div>
                        
                    </RightContainer>
                    <ClearTwoToneIcon
                        fontSize="large"
                        style={{
                            cursor: 'pointer',
                            marginTop: '-20px',
                            marginRight: '-15px',
                        }}
                        onClick={props.close}
                    />
                </TotalContainer>
                <div
                    style={{
                        width: '100%',
                        height: '121px',
                    }}
                >
                    <Button
                        style={{
                            border: 'none',
                            width: '140px',
                            height: '70px',
                            background: '#ff534b',
                            borderRadius: '35px',
                            fontFamily: 'Noto Sans KR',
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fontSize: '35px',
                            lineHeight: '51px',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#ffffff',
                            margin: '0 auto',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        onClick={
                            props.username ? onHandleUpdate : onHandleUpload
                        }
                    >
                        {props.username ? '수정' : '완료'}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}


