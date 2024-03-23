import { Code } from '@phosphor-icons/react';
import Body from '../components/Body';
import {useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';




export default function FeedPage() {

  const [code,setCode] = useState(null);
  function CodeEnter(){
    
    var arr = [8];
    arr[0] = document.getElementById("t1").value;
    arr[1] = document.getElementById("t2").value;
    arr[2] = document.getElementById("t3").value;
    arr[3] = document.getElementById("t4").value;
    arr[4] = document.getElementById("t5").value;
    arr[5] = document.getElementById("t6").value;
    arr[6] = document.getElementById("t7").value;
    arr[7] = document.getElementById("t8").value;
    var entry = arr.join("")



    let regex = /^[A-Za-z]+#[0-9]+$/i;
    if(regex.test(entry)){
      console.log("Searching for: " + entry)
      setCode("Searching for: " + entry);
      window.location.href = "http://localhost:3000/user/"+entry;
      return "Searching for: " + entry;
    }
    else{
      document.getElementsByClassName("horizontal-shaking")[0].style.animationPlayState = "running";
      document.getElementsByClassName("horizontal-shaking")[0].style.animationName = "none";
      setTimeout(() => {
        document.getElementsByClassName("horizontal-shaking")[0].style.animationName = "";
      }, 0);
      setCode("Invalid code: " + entry)

      return "Invalid Code";
    }

    
  }
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
        }
        else if (event.key === "Enter"){
          return CodeEnter();
        }
        else {
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


  const [isLoading, setLoading] = useState(false);

  
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  useEffect(() => {

    CodeInput();
  });
  

  return (
    
    <Body sidebar>
      
  <div className="d-flex flex-column align-items-center">
    <div id="otp" className="horizontal-shaking">
      <input className="m-2 text-center form-control form-control-solid rounded focus:shadow-outline" type="text" id="t1" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:shadow-outline" type="text" id="t2" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:shadow-outline" type="text" id="t3" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:shadow-outline" type="text" id="t4" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:shadow-outline" type="text" id="t5" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:shadow-outline" type="text" id="t6" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:shadow-outline" type="text" id="t7" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid rounded focus:shadow-outline" type="text" id="t8" maxLength="1" />
    </div>
    <div className="flex-column">
    <h4>{code}</h4>
    <Button
      variant="outline-secondary"
      disabled={isLoading}
      onClick={CodeEnter}
    >
      click me
    </Button>
    </div>
  </div>
    </Body>
    
  );

}