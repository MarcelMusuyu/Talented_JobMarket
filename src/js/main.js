import ProductData from "./ExternalServices.mjs";

import Alert from "./AlertMessage.mjs";
import HiringProcess from "./HiringProcess.mjs";

import {  loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const dataSource = new ProductData();

const info = new Alert("../json/alert.json", "main");

const jobFormElement = document.querySelector("#jobForm");
if(jobFormElement){

  const process = new HiringProcess(jobFormElement);
 
  const sendButton = document.querySelector("#jobSubmit");
  if(sendButton){
    sendButton.addEventListener("click", (e) => {
      
      e.preventDefault();
        process.publish();
    });
  }
}

 const registerFormElement = document.querySelector("#application");
  if(registerFormElement){
    const logProcess = new HiringProcess(registerFormElement);
    const registerButton = document.querySelector("#applicationSubmit");
    if(registerButton){
      registerButton.addEventListener("click", (e) => {
        e.preventDefault();
        logProcess.sendApplication();
      });
    }
  }





// info.displayAlerts();






