import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import ReactPlayer from "react-player"
import { Container } from 'reactstrap'
import VideoPlayerControls from './VideoPlayerControls'

import '../../../../custom-styles/videoplayer.css'


const VideoPlayer = ({ courseunit }) => {

    const [ videoPlayerState, setVideoPlayerState ] = useState({
        playing: false,
        muted: false,
        volume: 0.5
    })

    const { playing, muted, volume } = videoPlayerState
    const playerRef = useRef(null)

    const handlePlayPause = () => {
        setVideoPlayerState({
            ...videoPlayerState,
             playing: !videoPlayerState.playing
        })
    }

    const handleMute = () => {
        setVideoPlayerState({
            ...videoPlayerState,
              muted : !videoPlayerState.muted
        })
    }

    const handleVolumeChange = (value) => {
        setVideoPlayerState({
            ...videoPlayerState,
            volume : parseFloat(value / 100),
            muted: value === 0 ? true : false
        })
    }

    const handleVolumeSeekDown = (value) => {
        setVideoPlayerState({
            ...videoPlayerState,
              volume : parseFloat(value / 100),
              muted: value === 0 ? true : false
        })
    }

    const handleRewind = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)

    const handleFastForward = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)

    return <>
    <br />
    <br />
    <Container>
        <div className="video-player mb-3">
            <ReactPlayer
            ref={playerRef}
            width={"100%"}
            height={"100%"}
            url={courseunit.videourl}
            muted={muted}
            playing={playing}
            volume={volume}
            >
            </ReactPlayer>
           <VideoPlayerControls
            courseunit={courseunit}
            playing={playing}
            onPlayPause={handlePlayPause}
            onRewind={handleRewind}
            onFastForward={handleFastForward}
            muted={muted}
            onMute={handleMute}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekDown={handleVolumeSeekDown}
            volume={volume}
           />
        </div>
     </Container>
    </>
}

const mapStateToProps = (state) => ({
    courseunit: state.courseunit.unitDetails
})

export default connect(mapStateToProps)(VideoPlayer)
