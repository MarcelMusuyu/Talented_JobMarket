
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
export default class HiringProcess{

constructor(formElement) {
    this.formElement = formElement ;
    
  }
  async init() {
    
  }


    async publish() {
     
    try {
       
      const response = await services.addJobOpportunity(this.formElement);
    
      if (response) {
    
         document.querySelector("#message").textContent = "Job Publication successful!";
         document.querySelector("#message").setAttribute("class","alert alert-success");
         document.querySelector("#message").style.display = "block";
        setInterval(() => {
           document.querySelector("#loginSubmit").textContent = "";
          document.querySelector("#loginSubmit").textContent = "..."
         }, 5000);
        
          window.location.href = "/index.html";
        
         // Redirect to the main page after a delay
       
      }else{
        document.querySelector("#message").textContent = "Invalid Data format!";
        document.querySelector("#message").setAttribute("class","alert alert-danger");
        document.querySelector("#message").style.display = "block";
      }
     
      
    } catch (err) {
      
      document.querySelector("#message").textContent = "An error occurred!";
      document.querySelector("#message").setAttribute("class","alert alert-danger");
      document.querySelector("#message").style.display = "block";
    }
  }


   async sendApplication() {
     
     
    try {
       
      const response = await services.sendApplication(this.formElement);
    
      if (response) {
          
         document.querySelector("#message").textContent = "Application creation successful!";
         document.querySelector("#message").setAttribute("class","alert alert-success");
         document.querySelector("#message").style.display = "block";
       
        
          setInterval(() => {
           window.location.href = "index.html";
        
         }, 5000);
        
        
         // Redirect to the main page after a delay
       
      }else{
        document.querySelector("#message").textContent = "Invalid data format!";
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


  async updateApplication(id) {
      const formElement = this.formElement;
      
    try {
       
      const response = await services.updateApplication(this.formElement,id);
    
      if (response) {
          
         document.querySelector("#message").textContent = "Application updated successful!";
         document.querySelector("#message").setAttribute("class","alert alert-success");
         document.querySelector("#message").style.display = "block";
        setInterval(() => {
           window.location.href = "index.html";
        
         }, 5000);
        
         
         // Redirect to the main page after a delay
       
      }else{
        document.querySelector("#message").textContent = "Invalid data format!";
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