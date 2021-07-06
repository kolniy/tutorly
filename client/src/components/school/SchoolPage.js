import React, { useState, useEffect } from 'react'
import axios from 'axios'
import setDocumentTitle from "../../utilities/setDocumentTitle"

// theme components import 
import HeroTheme from "../../themes/Hero-type-theme/LandingPage"
import SectionTheme from "../../themes/Section-type-theme/LandingPage"

export const SchoolPage = ({ match }) => {

    const [ school, setSchool ] = useState(null)
    const [ pageLoading, setPageLoading ] = useState(true)

    useEffect(() => {
        if(match.params.schoolname.length > 0){
        getSchoolBySchoolName(match.params.schoolname)
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
           setSchool(res.data)
           setPageLoading(false)
        } catch (error) {
            if(error.response.status === 404){
                setSchool(null)
               setPageLoading(false)
            }
            console.log(error.response.data.errors[0].msg)
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
                          <><HeroTheme /></> 
                          : <><SectionTheme/></>
                    }
                  </>
                }
            </>
       }
    </>
}

export default SchoolPage
