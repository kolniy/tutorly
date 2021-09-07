import React from 'react'
import { Container } from 'reactstrap'
import UnitItem from './UnitItem'

export const ModuleItem = ({ module }) => {
    return <>
        <div className="module-item">
            <Container fluid style={{
                width: '90%'
            }}>
              <h5>{ module.name }</h5>
              {
                module.courseunit.length === 0 ? <p style={{color:'#fff'}}>module has no units</p> : <>
                    {
                  module.courseunit.map((moduleUnit) => <UnitItem key={moduleUnit._id} unitItem={moduleUnit} />)
                     }
                </>
              }
            </Container>
        </div>
    </>
}

export default ModuleItem