import React from 'react'
import { Container } from 'reactstrap'
import UnitItem from './UnitItem'

export const ModuleItem = () => {
    return <>
        <div className="module-item">
            <Container fluid style={{
                width: '90%'
            }}>
              <h5>Module Name</h5>
              <UnitItem />
              <UnitItem />
              <UnitItem />
            </Container>
        </div>
    </>
}

export default ModuleItem