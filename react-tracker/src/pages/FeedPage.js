import Body from '../components/Body';
import {useEffect } from 'react';
import Button from 'react-bootstrap/Button';





export default function FeedPage() {

  // Event listener to handle box-style connect-code input
  function CodeInput() {
    const inputs = document.querySelectorAll('#otp > *[id]');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('keydown', function(event) {
        if (event.key === "Backspace") {
          if (i === inputs.length - 1){
            if(inputs[i].value === ''){
              inputs[i-1].focus();
              return true;
            }
            return true;
        }
          inputs[i].value = '';

          if (i !== 0)
            inputs[i - 1].focus();
        } else {
          if (i === inputs.length - 1 && inputs[i].value !== '') {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            inputs[i].value = event.key;
            if (i !== inputs.length - 1)
              inputs[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            inputs[i].value = String.fromCharCode(event.keyCode);
            if (i !== inputs.length - 1)
              inputs[i + 1].focus();
            event.preventDefault();
          }
        }
      });
    }
  }

  useEffect(() => {
    CodeInput();
  });
  

  return (
    
    <Body sidebar>
      
  <div className="flex">
    <div id="otp" className="flex">
      <input className="m-2 text-center form-control form-control-solid rounded focus:shadow-outline" type="text" id="first" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="second" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="third" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="fourth" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="fifth" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="sixth" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="seven" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="eight" maxLength="1" />
    </div>

  </div>
    </Body>
    
  );

}