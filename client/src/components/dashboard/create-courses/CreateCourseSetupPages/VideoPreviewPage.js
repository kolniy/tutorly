import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import VideoPlayer from './VideoPlayer'
import { loadCourseUnit } from '../../../../actions/courseunit'

export const VideoPreviewPage = ({ match, courseunit: {
    loading,
    unitDetails
}, loadUnit }) => {

    useEffect(() => {
        loadUnit(match.params.videoId)
    }, [match.params.videoId, loadUnit])

    return <>
        {
            loading === true && unitDetails === null ? <p className="text-center lead">loading...</p> : <>
        <p className="lead text-center">vidoe ID is {
            match.params.videoId
           }</p>
        <VideoPlayer  />
            </>
        }
    </>
}

const mapStateToProps = (state) => ({
    courseunit: state.courseunit
})

const mapDispatchToProps = (dispatch) => ({
 loadUnit: (courseUnitId) => dispatch(loadCourseUnit(courseUnitId))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoPreviewPage)
