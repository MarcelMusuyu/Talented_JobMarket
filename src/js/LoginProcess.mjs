
import ExternalServices from "./ExternalServices.mjs";

 const services = new ExternalServices();


function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
export default class LoginProcess{

constructor() {
    this.formElement = document.getElementById("loginForm");
    
  }
  async init() {
    
  }


    async login() {
      const formElement = this.formElement;
      const credentials = formDataToJSON(formElement);
      console.log(credentials);
      
      
    try {
       
      const response = await services.login(credentials);
     console.log(response);
      if (response) {
           const receivedToken = response.header('Authorization');
            console.log('Received Token:', receivedToken); 
          localStorage.setItem("token", receivedToken);
         document.querySelector("#message").textContent = "Login successful!";
         document.querySelector("#message").setAttribute("class","alert alert-success");
         document.querySelector("#message").style.display = "block";
        setInterval(() => {
           document.querySelector("#loginSubmit").textContent = "";
          document.querySelector("#loginSubmit").textContent = "..."
         }, 5000);
        
          //window.location.href = "/index.html";
        
         // Redirect to the main page after a delay
       
      }else{
        document.querySelector("#message").textContent = "Invalid credentials!";
        document.querySelector("#message").setAttribute("class","alert alert-danger");
        document.querySelector("#message").style.display = "block";
      }
     
      
    } catch (err) {
      console.error(err);
      document.querySelector("#message").textContent = "An error occurred!";
      document.querySelector("#message").setAttribute("class","alert alert-danger");
      document.querySelector("#message").style.display = "block";
    }
  }

        
        
    
}