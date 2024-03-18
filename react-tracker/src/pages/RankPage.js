import Body from '../components/Body';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';



export default function RankPage({ sidebar, children }) {
  return (

    <Container fluid>
      <Sidebar></Sidebar>
      <Row>
        <Col sm={12} lg={2} className="d-none d-lg-block">  </Col>        
        <Col>2 of 2</Col>
      </Row>
      <Row> 
      <Col sm={12} lg={2} className="d-none d-lg-block"></Col>        
      <Col>Chart</Col>  
      </Row>
    </Container>
  );
}