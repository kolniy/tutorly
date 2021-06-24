import React from 'react'
import { Container, Row, Col } from "reactstrap"
import authorImg from "./images/author-image.png"

export const About = () => {
    return <> 
    <section className="about">
      <Container fluid className="about-container">
      <Row>
           <Col sm="3" md="3">
               <div className="about-author">
               <h3 className="about-author-subtitle">
                       About Sano's <span>wood work</span>
                   </h3>
                   <div className="about-img-container">
                    <img src={authorImg} alt="author display" 
                    className="img-fluid" />
                   </div>
               </div>
           </Col>
           <Col sm="9" md="9">
               <div className="about-text">
                    <p className="about-text-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum risus lorem, ut bibendum erat varius sit amet. In hac habitasse platea dictumst.
                    Quisque pellentesque risus ut lacinia commodo. Sed vulputate blandit pretium. Vestibulum pellentesque venenatis porta. Ut ut efficitur leo. Suspendisse 
                    sodales tellus vitae sagittis pretium. Nam maximus, purus eget hendrerit commodo, nunc enim rutrum nisi, sit amet tristique leo enim sed odio. Nullam placerat
                     egestas arcu, quis facilisis nisl pellentesque ac. In non est magna
                    </p>
               </div>
           </Col>
       </Row>
      </Container>
    </section>
    </>
}

export default About