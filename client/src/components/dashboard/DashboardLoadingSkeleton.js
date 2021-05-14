import React from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

export const DashboardLoadingSkeleton = () => {
    return <>
    <SkeletonTheme color="grey" highlightColor="#444">
    <p>
    <Skeleton count={3} width={100}/>
    </p>
    </SkeletonTheme>
    </>
}

export default DashboardLoadingSkeleton
