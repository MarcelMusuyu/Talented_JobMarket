import { loadHeaderFooter } from "./utils.mjs";

import  LoginProcess  from "./LoginProcess.mjs";

 loadHeaderFooter();

 

const formElement = document.querySelector("#loginForm");



if(formElement){
  const logProcess = new LoginProcess(formElement);
  const loginButton = document.querySelector("#loginSubmit");
  if(loginButton){
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      logProcess.login();
    });
  }
}

 const registerFormElement = document.querySelector("#registerForm");
  if(registerFormElement){
    const logProcess = new LoginProcess(registerFormElement);
    const registerButton = document.querySelector("#registerSubmit");
    if(registerButton){
      registerButton.addEventListener("click", (e) => {
        e.preventDefault();
        logProcess.register();
      });
    }
  }

  
 