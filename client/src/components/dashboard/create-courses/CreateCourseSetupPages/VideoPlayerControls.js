import React, { useState } from 'react'
import { Button, Popover } from 'reactstrap'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'

const SliderWithTooltip = createSliderWithTooltip(Slider)

export const VideoPlayerControls = ({ 
     courseunit,
     onPlayPause,
     playing,
     onRewind,
     onFastForward,
     muted,
     onMute,
     volume,
     onVolumeChange,
     onVolumeSeekDown
    }) => {

    const [ popoverDisplay, setPopoverDisplay ] = useState(false)
    const togglePopover = () => setPopoverDisplay(!popoverDisplay)

    return <>
         <div className="video-player__controls-wrapper">
                {/* top controls  */}
                <div className="video-info">
                 <h5>{courseunit.name}</h5>
                <Button className="btn-icon btn-3" color="default" type="button">
                    <span className="btn-inner--icon">
                      <i className="ni ni-bag-17"></i>
                    </span>
                    <span className="btn-inner--text">Bookmark</span>
                 </Button>
                </div>

                {/* middle controls  */}
                <div className="video-player__middle-controls">
                    <div onClick={onRewind} className="player-controls-icon">
                        <i className="fas fa-backward"></i>
                    </div>
                    <div onClick={onPlayPause} className="player-controls-icon">
                        {
                            playing ? (<i className="fas fa-pause"></i>) : (<i className="fas fa-play"></i>)
                        }
                    </div>
                    <div onClick={onFastForward} className="player-controls-icon">
                        <i className="fas fa-forward"></i>
                    </div>
                </div>

                {/* bottom controls  */}
            <div className="video-player__bottom-controls">
             <div className="video-player__slider">
                        <SliderWithTooltip
                         trackStyle={{ backgroundColor: '#242121', height:6 }}
                         railStyle={{ backgroundColor: '#fff', height:6 }}
                         defaultValue={30}
                         min={0}
                         max={100}
                        tipFormatter={v => `${v} %`}
                        tipProps={{ overlayClassName: 'foo' }}
                        handleStyle={{
                            borderColor: '#242121',
                            height:17,
                            width: 17,
                            backgroundColor: '#fff',
                          }}
                            // onChange={log}
                        />
                 </div>
                <div className="bottom-controls">
                    <div onClick={onPlayPause} className="video-player__bottom-controls-play-icon ml-3">
                          {
                              playing ? (<i className="fas fa-pause"></i>) : (<i className="fas fa-play"></i>)
                          }
                    </div>
                    <div onClick={onMute} className="video-player__bottom-controls-volume-icon ml-2">
                        {
                            muted ? (<i className="fas fa-volume-mute"></i>) : (<i className="fas fa-volume-up"></i>)
                        }
                    </div>
                    <div className="video-player__volume-slider">
                    <SliderWithTooltip
                         trackStyle={{ backgroundColor: '#242121', height:4 }}
                         railStyle={{ backgroundColor: '#fff', height:4 }}
                         value={volume * 100}
                         min={0}
                         max={100}
                        tipFormatter={v => `${v} %`}
                        tipProps={{ overlayClassName: 'foo' }}
                        handleStyle={{
                            borderColor: '#242121',
                            height:12.5,
                            width: 12.5,
                            backgroundColor: '#242121',
                          }}
                        onChange={onVolumeChange}
                        onAfterChange={onVolumeSeekDown}
                        />
                    </div>
                    <div className="video-player__playback-time">
                        05:05
                    </div>
                    <div className="video-player__playback-rate">
                  <button
                    className="video-player__playback-rate-btn"
                    id="popoverplaybackrate"
                    type="button"
                     >
                    1x
                 </button>
                 <Popover 
                    placement='bottom'
                    isOpen={popoverDisplay}
                    target="popoverplaybackrate"
                    toggle={togglePopover}
                 >
                  {
                    [0.5, 1, 1.5, 2].map((rate) => (<Button key={rate} className="playback-rate__btn-item">{rate}</Button>))
                  } 
                 </Popover>
                 </div>
                    <div className="video-player__fullscreen">
                    <i className="fas fa-expand"></i>
                    </div>
                 </div>
                </div>
            </div>
    </>
}

export default VideoPlayerControls