import { loadHeaderFooter } from "./utils.mjs";

import  LoginProcess  from "./LoginProcess.mjs";

 loadHeaderFooter();



 const logProcess = new LoginProcess();

document.querySelector("#loginSubmit").addEventListener("click", (e) => {
      console.log("I m a login");
      e.preventDefault();
      logProcess.login();
    });


 