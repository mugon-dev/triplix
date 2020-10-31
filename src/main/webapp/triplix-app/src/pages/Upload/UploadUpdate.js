import React, { useEffect, useState } from 'react';
import {RouteComponentProps} from 'react-router';
import { Route , withRouter} from 'react-router-dom';
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
import { makeStyles } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    DropZoneArea: {
        height: '100%',
        border: '4px dashed #979797',
        boxSizing: 'border-box',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto 0',
        backgroundColor: '#404040',
    },
    DropzoneParagrap: {
        fontFamily: 'Noto Sans KR',
        fontStyle: 'normal',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    colorq: {
        display: 'flex',
        marginTop: '50px',
    },
}));
const UploadUpdate = (props) => {
    console.log("업데이트 모달=============",props.id);
    //유저 정보
    const [userId, setUserId] = useState();
    //유저 상태
    const isLogin = useSelector((store) => store.isLogin);

    const classes = useStyles();

    const [mood, setMood] = useState(props.mood ? props.mood : ''); //분위기
    const [board, setBoard] = useState({
        btitle: '',
        bcontent: '',
        bimage: ''
    });
    const [image, setImage] = useState();
    const onDrop = async (file) => {
        
        setBoard((prevState) => {
            return {
                ...prevState,
                [file[0].name]: file[0],
            };
        });
        console.log(board);
        setImage(file[0]);
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // 이미지
        useEffect(() => {
            // 토큰 가져오기
            if(props.id!=null){
    		fetch("http://localhost:8000/board/detail/"+props.id, {
    			method: "GET",
    			headers:{
    				"Authorization": localStorage.getItem("Authorization")
    			}
            })
            .then(res=>res.json())
            .then(res=>{
                setImage(props.image ? props.image : null); 
            });
        }
            // setAdvertising(props.advertising ? props.advertising : false);
            // setMood(props.mood ? props.mood : '');
            // setRating(props.rating ? props.rating : '');

        }, []);

    const changeValue = (e) => {
        setBoard(prevState => {
            return {
                ...board,
                [e.target.name]: e.target.value
            }
        });

    }

    const onHandleUpload = (e) => {
        board.bimage = image;
        console.log(board);
        e.preventDefault();
        const formData = new FormData();
        var json = JSON.stringify(board);
        formData.append("board", json);
        formData.append("title", board.btitle);
        formData.append("content", board.bcontent);
        formData.append("image", board.bimage);
        if (
            board.bimage === null || //이미지업로드 X
            board.btitle === null || //제목이(x)
            board.bcontent === null //상세내용x                       
        ) {
            alert('업로드내용을 입력해주세요');
        } else {
            //업로드 fetch , bimage, btitle, bcontent
            fetch("http://localhost:8000/board/update/"+props.bId, {
                method: "PUT",
                headers: {
                    "Authorization": localStorage.getItem("Authorization")
                },
                body: formData,
            }).then(res => res.text()).then(res => {
                if (res === "ok") {
                    alert('업로드 완료');
                    window.location.reload();
                } else {
                    alert('글등록 실패');
                }
            });
            props.close();
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
                        <div
                            style={{
                                height: '100%',
                            }}
                        >
                            <DropzoneArea
                                onDrop={onDrop}
                                dropzoneClass={classes.DropZoneArea}
                                dropzoneParagraphClass={classes.DropzoneParagrap}
                                Icon=""
                                dropzoneText={
                                    <div style={{ textAlign: 'center' }}>
                                        {/* <img src={image ?  props.image: URL.createObjectURL(image)} alt={image ? image.name : null}  /> */}
                                    </div>
                                }
                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                showPreviews={true}
                                showPreviewsInDropzone={true}
                                useChipsForPreview //사진이 아니라 이름으로 보여주기 위함
                                previewText="Selected files"
                                filesLimit={1} //파일 갯수
                                
                            />
                        </div>
        
                    </UploadDropZone>
                    <RightContainer>
                        <TitleInputBar>
                            <form style={{ width: '100%', height: '100%' }}>
                                <Input
                                    type="text"
                                    placeholder={props.title}
                                    name="btitle"
                                    onChange={changeValue}
                                    style={{ width: '100%', height: '11%', color: '#ffffff' }}
                                />
                                <TextField
                                    style={{
                                        color: '#ffffff',
                                        width: '100%',
                                        marginTop: '21px',
                                        borderRadius: '10px',
                                        boxSizing: 'border-box',
                                        border: '2px solid #979797',
                                    }}
                                    id="outlined-multiline-static"
                                    name="bcontent"
                                    multiline
                                    rows={17}
                                    placeholder={props.content}
                                    variant="outlined"
                                    onChange={changeValue}
                                />
                            </form>
                        </TitleInputBar>
                        <AdvertisementComponent>
                            <Advertisement />
                        </AdvertisementComponent>
                        <AtmosphereComponent>
                            <Atmosphere />
                        </AtmosphereComponent>
                        <LocationComponent>
                            <Address />
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
                        onClick={onHandleUpload}
                    >
                        완료
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}

export default UploadUpdate;
