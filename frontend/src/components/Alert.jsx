import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import "./Alert.css"

function AlertDismissible() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert  show={show} variant="success">
        <Alert.Heading>Forget password?</Alert.Heading>
        <p>
          Relax and remember your pasword :)
          
        </p>
        <button className='ty' onClick={() => setShow(false)} variant="outline-success">
            close
          </button>
      </Alert>

       <button className='yt' onClick={() => setShow(true)}>Forget Password?</button>
    </>
  );
}

export default AlertDismissible;