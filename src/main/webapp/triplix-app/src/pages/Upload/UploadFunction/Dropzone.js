import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import makeStyles from '@material-ui/core/styles/makeStyles';

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
// const UploadTitle = styled.p`
//     color: #000000;
//     font-weight: 500;
//     font-size: 18px;
//     line-height: 26px;
//     display: flex;
// `;
// const Upload = styled.p`
//     font-weight: bold;
//     font-size: 24px;
//     line-height: 35px;
//     color: #ff534b;
// 

function Dropzone(props) {
    const classes = useStyles();
    const [bimage, setBimage] = useState();
    const onDrop = async (file) => {
        const base64 = await convertBase64(file[0]);
        setBimage(base64);
        props.setHadImageurl(bimage);   
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
    return (
        <div src = {bimage}
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
                        <img src={bimage} alt="NewPick" />
                    </div>                    
                }
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                showPreviewsInDropzone={true}
                useChipsForPreview //사진이 아니라 이름으로 보여주기 위함
                previewText="Selected files"
                filesLimit={1} //파일 갯수
                // previewGridProps={{
                //     //업로드시 아래 select 파일 이라고 뜨는것
                //     container: { spacing: 1, direction: 'row' },
                // }}
                //  previewChipProps={{ classes: { root: classes.previewChip } }}
                
            />
        </div>
    );
}

export default Dropzone;
