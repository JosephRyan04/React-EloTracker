import Body from '../components/Body';
import {useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Shuffle} from "@phosphor-icons/react";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

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
      entry = entry.replace('#', "-");
      window.location.href = "/user/"+entry;
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
  function RandomUser(){
    (async () => {
      const apiResponse = await fetch(BASE_API_URL + '/api/random-user');
      if (apiResponse.ok) {
        let results = await apiResponse.json();
        console.log(results);
        results = results.replace('#', "-");
        window.location.href = "/user/" + results;
      }
      else {
        console.log(" Random user bad request");
        window.location.href = "/user/ABC#123"
      }
    })();
  }
  // Event listener to handle box-style connect-code input
  let showExample = true;
  function CodeInput() {
    
    const inputs = document.querySelectorAll('#otp > *[id]');
    inputs[0].value = "A";
    inputs[1].value = "B";
    inputs[2].value = "C";
    inputs[3].value = "D";
    inputs[4].value = "#";
    inputs[5].value = "1";
    inputs[6].value = "2";
    inputs[7].value = "3";
    
    for (let i = 0; i < inputs.length; i++) {
      
      inputs[i].addEventListener('keydown', function(event) {
        if (event.key && setExample()){
          for (let i = 0; i < inputs.length; i++){
          inputs[i].classList.add("ex");
          inputs[i].value = '';
          }
          }
          
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
          CodeEnter();
          return;
        }
        else {
          if (i === inputs.length - 1 && inputs[i].value !== '') {
            
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

  // Acts as latch to only show the example code once. Avoids the unsafe referance of using
  // only a showExample bool  
  function setExample(){
    if (showExample){
      showExample = false;
      return true;
    }
    else{
      return false;
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

  window.onload = function() {
    document.getElementById("t1").focus();
    CodeInput();
  };

  

  return (
    
    <Body sidebar>
      
  <div className="d-flex flex-column align-items-center">
    <div id="otp" className="horizontal-shaking">
      <input className="m-2 text-center form-control form-control-solid focus:shadow-outline" type="text" id="t1" maxLength="1"/>
      <input className="m-2 text-center form-control form-control-solid focus:shadow-outline" type="text" id="t2" maxLength="1"/>
      <input className="m-2 text-center form-control form-control-solid focus:shadow-outline" type="text" id="t3" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid focus:shadow-outline" type="text" id="t4" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid focus:shadow-outline" type="text" id="t5" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid focus:shadow-outline" type="text" id="t6" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid focus:shadow-outline" type="text" id="t7" maxLength="1" />
      <input className="m-2 text-center form-control form-control-solid focus:shadow-outline" type="text" id="t8" maxLength="1" />
    </div>
    <div className="d-flex flex-column align-items-center">
    <h4>{code}</h4>
    <Button
      variant="outline-secondary"
      disabled={isLoading}
      onClick={CodeEnter}
    >
      Search
    </Button>
    <Button
      variant="outline-success"
      id='update-button'
      disabled={isLoading}
      onClick={RandomUser}
    >
      <Shuffle size={24} color="#ffffff" />  Random
    </Button>
    </div>
  </div>
    </Body>
    
  );

}