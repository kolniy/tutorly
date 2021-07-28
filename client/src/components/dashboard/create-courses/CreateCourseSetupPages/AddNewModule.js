import React from 'react'

export const AddNewModule = ({ openModalDialog }) => {
    return <>
        <div className="modules-container__no-module">
            <div className="no-modules-text">
                <h4>0 Module(s)</h4>
                 <hr className="no-text__hr" />
            </div>
            <div onClick={openModalDialog} className="add-module__button">
                <i className="fas fa-plus"></i>
                <p>Click to add a new Module</p>
            </div>
        </div>
    </>
}

export default AddNewModule