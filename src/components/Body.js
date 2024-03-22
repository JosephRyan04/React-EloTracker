import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Sidebar from './Sidebar';

export default function Body({ sidebar, children }) {
  return (
    // className='m-0'
    <Container fluid className='MainBody'> 
      <Stack direction="horizontal" className="Body">
        {sidebar && <Sidebar />}
        <Container fluid className="Content">
          {children}
        </Container>
      </Stack>
    </Container>
  );
}
