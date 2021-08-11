import React from 'react'
import { Modal,
     ModalBody,
     ModalFooter,
     Row,
     Col,
     Progress,
     Button
    } from "reactstrap"

export const VideoUploadModal = ({
    videoUploadDialog,
    fileToSend,
    loaded,
    videoFilePickerHandler,
    closeVideoUploadDialog,
    uploadVideo
}) => {
    return <>
        <Modal isOpen={videoUploadDialog}>
        <div style={{
          fontWeight:'700',
          fontSize:'20',
          color:'#242121',
          textTransform:'uppercase'
        }} className="modal-header">
          Upload Lesson Video
        </div>
        <ModalBody>
            {
              fileToSend !== null && fileToSend !== undefined && <>
                 <div className="picked-file-container">
                    <div style={{
                        width:'80%',
                        margin:'0 auto'
                    }}>
                    <p style={{
                        overflowWrap:'break-word',
                    }} className="lead text-center">{fileToSend.name}</p>
                    </div>
                      {
                      loaded > 0 &&
                        <Row>
                            <Col sm="12" md="12">
                            <div className="course-thumbnail-upload-progress">
                            <p className="lead">Upload Progress</p>
                                {
                                <Progress striped max="100" style={{
                                  backgroundColor:'#242121'
                                }} value={loaded}>
                                   {
                                Math.round(loaded, 2)
                                }%
                             </Progress>
                                 }
                             </div>
                            </Col>
                        </Row>
                        }
                 </div>
              </>
            }
         <Button block onClick={videoFilePickerHandler}>Pick File</Button>
        </ModalBody>
        <ModalFooter>
          <Button style={{
            color:'#242121',
            backgroundColor:'#fff',
            border:'1px solid #242121',
            paddingLeft:'40px',
            paddingRight:'40px'
          }} onClick={closeVideoUploadDialog}>Cancel</Button>{' '}
          <Button
          disabled={fileToSend === null}
          onClick={uploadVideo}
          style={{
              color:'#fff',
              backgroundColor:'#242121',
              paddingLeft:'40px',
              paddingRight:'40px'
          }}>Upload</Button>
        </ModalFooter>
      </Modal>
    </>
}

export default VideoUploadModal



// // const uploadVideo = async () => {

// //   const cloudinaryCloudName = 'kolaniyi'
// //   const CloudinaryUploadPreset = 'f17zv7io'
// //   const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`

// //   const form  = new FormData()
// //   form.append("upload_preset", CloudinaryUploadPreset)
// //   form.append("file", videoFileToCloudinary)

// //   const config = {
// //       onUploadProgress: (event) => {
// //           setLoaded(event.loaded / event.total * 100)
// //       }
// //   }

// //   try {
// //   delete axios.defaults.headers.common["x-auth-token"]
// //   const res = await axios.post(cloudinaryUploadUrl, form, config)
// //   setUploadedVideoInfo({
// //       ...uploadedVideoInfo,
// //       videoUrl: res.data.url,
// //       videoPublicId: res.data.public_id
//   })
//   alert.show("video uploaded successfully", {
//       type: "success"
//   })
//   setVideoFile(null)
//   setVideoFileToCloudinary(null)
//   closeVideoUploadDialog()
//   setLoaded(0)
//   } catch (error) {
//       console.log(error)
//   }
// }