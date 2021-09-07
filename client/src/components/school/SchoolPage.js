import React, { useState, useEffect } from 'react'
import axios from 'axios'
import setDocumentTitle from "../../utilities/setDocumentTitle"

// theme components import 
import HeroTheme from "../../themes/Hero-type-theme/LandingPage"
import SectionTheme from "../../themes/Section-type-theme/LandingPage"

export const SchoolPage = ({ match }) => {

    const [ school, setSchool ] = useState(null)
    const [ theme, setTheme ] = useState(null)
    const [ pageLoading, setPageLoading ] = useState(true)

    const [ schoolCourses, setSchoolCourses ] = useState([])
    const [ coursesLoading, setCoursesLoading ] = useState(false)

    useEffect(() => {
        if(match.params.schoolname.length > 0){
        getSchoolBySchoolName(match.params.schoolname)
        getCoursesBySchoolName(match.params.schoolname)
        }
    }, [match.params.schoolname])

    useEffect(() => {
        if(school){
            setDocumentTitle(school)
        }
    }, [school])

    const getSchoolBySchoolName = async (schoolname) => {
        try {
           const res = await axios.get(`/api/v1/school/${schoolname}`)
           setSchool(res.data.school)
           setTheme(res.data.theme)
           setPageLoading(false)
        } catch (error) {
            if(error.response.status === 404){
                setSchool(null)
               setPageLoading(false)
            }
            console.log(error.response.data.errors[0].msg)
        }
    }

    const getCoursesBySchoolName = async (schoolName) => {
        try {
            setCoursesLoading(true)
            const res = await axios.get(`/api/v1/school/courses/${schoolName}`)
            setCoursesLoading(false)
            setSchoolCourses(res.data)
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.errors[0]?.msg) 
        }
    }

    return <>
       {
           pageLoading === true ? 
           <p className="lead text-center">loading</p>:
            <>
                {
                  !pageLoading && school === null ?
                   <p className="text-center lead">School Not Found</p> : 
                   <>
                    {
                          school.themename.toLowerCase().includes("hero") ? 
                          <><HeroTheme themeData={theme}
                            courses={schoolCourses}
                            coursesLoading={coursesLoading}
                           /></> 
                          : <><SectionTheme themeData={theme}/></>
                    }
                  </>
                }
            </>
       }
    </>
}

export default SchoolPage
