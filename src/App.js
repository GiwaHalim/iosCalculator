import Calculator from './components/calculator';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './App.css';

function App() {
  return (
    <>
     <Container   variant='secondary' className='d-flex justify-content-center min-vh-100 align-items-center p-5 '>
        <Calculator />
    </Container>
    </>
   
  );
}

export default App;
