
import ExternalServices from "./ExternalServices.mjs";
import { getParam } from "./utils.mjs";
 const services = new ExternalServices();


// function formDataToJSON(formElement) {
//   const formData = new FormData(formElement),
//     convertedJSON = {};

//   formData.forEach(function (value, key) {
//     convertedJSON[key] = value;
//   });

//   return convertedJSON;
// }
export default class HiringProcess{

constructor(formElement) {
    this.formElement = formElement ;
    
  }
  async init() {
    
  }


    async publish() {
     
    try {

      const title = document.querySelector("input[name=\"title\"]").value;
     
  const description = document.querySelector("textarea[name=\"description\"]").value;
  
  const responsibilitiesText = document.querySelector("textarea[name=\"responsibilities\"]").value;
  
  const location = document.querySelector("input[name=\"location\"]").value;
    
  const closingDate = document.querySelector("input[name=\"closingDate\"]").value;

  const contract = document.querySelector("select[name=\"type_contract\"]").value;
  const salary = document.querySelector("input[name=\"salary\"]").value;
  const experience = document.querySelector("input[name=\"experience\"]").value;
  
  const recruiter = document.querySelector("input[name=\"recruiter\"]").value;
  const status = document.querySelector("select[name=\"status\"]").value;
  const education = document.querySelector("textarea[name=\"education\"]").value;
  const skillsText = document.querySelector("textarea[name=\"requirements\"]").value;
 

  // 1. Split textarea values into arrays
  const responsibilities = responsibilitiesText.split(",").map(item => item.trim()).filter(item => item);
  const requirements = skillsText.split(",").map(item => item.trim()).filter(item => item);
 

  // 2. Construct payload object
  const payload = {
    title,
    description,
    requirements,
    responsibilities,
    location,
    contract,
    salary,
    education,
    experience,
    closingDate,
    recruiter,
    status,
  };

       
     const response = await services.addJobOpportunity(payload);
   
      if (!response.ok) {
        throw new Error("Invalid data format!");
      }
          window.location.href = "/index.html";
        
         // Redirect to the main page after a delay
       
      document.querySelector("#message").textContent = "Job opportunity created successfully!";
       document.querySelector("#message").setAttribute("class","alert alert-success");
        document.querySelector("#message").style.display = "block";
      
    } catch (err) {
      if(document.querySelector("#message")){
        document.querySelector("#message").textContent = "An error occurred!";
        document.querySelector("#message").setAttribute("class","alert alert-danger");
        document.querySelector("#message").style.display = "block";
      }
      
    }
  }


   async sendApplication() {
     
       const formData = new FormData();
    
  const jobOpportunity = getParam("job");
     formData.append("jobOpportunity",jobOpportunity);     
  const resumeInput = document.querySelector(`input[type="file"][name="resume"]`);
   const resumeFile = resumeInput.files[0];

  formData.delete("resume");  // Remove the empty profile
  formData.append("resume", resumeFile); // Append the actual file

  const coverInput = document.querySelector(`input[type="file"][name="coverLetter"]`);
   const coverFile = coverInput.files[0];

  formData.delete("coverLetter");  
  formData.append("coverLetter", coverFile); 

  const trascriptInput = document.querySelector(`input[type="file"][name="transcript"]`);
   const trascriptFile = trascriptInput.files[0];

  formData.delete("transcript");  
  formData.append("transcript", trascriptFile); 

  const languagesText = document.querySelector("textarea[name=\"language\"]").value;
  const skillsText = document.querySelector("textarea[name=\"skill\"]").value;
 

  // 1. Split textarea values into arrays
  const languages = languagesText.split(",").map(item => item.trim()).filter(item => item);
  const skills = skillsText.split(",").map(item => item.trim()).filter(item => item);
  formData.delete("skills");
  formData.append("skills",skills);
  
  formData.delete("languages");
  formData.append("languages",languages);
 
     
    try {
       
      const response = await services.sendApplication(formData);
    
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
    
      document.querySelector("#message").textContent = "An error occurred!";
      document.querySelector("#message").setAttribute("class","alert alert-danger");
      document.querySelector("#message").style.display = "block";
    }
  }


  async updateApplication(id) {
      
      
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
    
      document.querySelector("#message").textContent = "An error occurred!";
      document.querySelector("#message").setAttribute("class","alert alert-danger");
      document.querySelector("#message").style.display = "block";
    }
  }

        
        
    
}