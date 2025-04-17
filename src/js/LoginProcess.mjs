
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

const loadingIndicator = document.getElementById("loading");
  const errorMessages = {};

       
  ["user_role", "firstname", "lastname", "email", "profile", "password"].forEach(fieldId => {
            errorMessages[fieldId] = document.getElementById(`${fieldId}-error`);
        });

  function hideLoading() {
            loadingIndicator.style.display = "none";
            document.querySelector("#registerSubmit").disabled = false;
        }

  function resetErrors() {
            for (let key in errorMessages) {
                errorMessages[key].textContent = "";
            }
        }

function displayErrors(errors) {
            resetErrors();
            errors.forEach(error => {
                if (errorMessages[error.path]) {
                    errorMessages[error.path].textContent = error.msg;
                }
            });
   }


export default class LoginProcess{

constructor(formElement) {
    this.formElement = formElement ;
    
  }
  async init() {
    
  }


    async login() {
      const formElement = this.formElement;
      const credentials = formDataToJSON(formElement);
     
      
    try {
       
      const response = await services.login(credentials);
    
      if (response) {
           const receivedToken = response.token;
            
          localStorage.setItem("token", receivedToken);
         document.querySelector("#message").textContent = "Login successful!";
         document.querySelector("#message").setAttribute("class","alert alert-success");
         document.querySelector("#message").style.display = "block";
        setInterval(() => {
           document.querySelector("#loginSubmit").textContent = "";
          document.querySelector("#loginSubmit").textContent = "..."
         }, 5000);
        
          window.location.href = "/index.html";
        
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


   async register() {
      const formElement = this.formElement;
      
      
   
      try {
          const response = await services.register(formElement); // Await the result from services.register
          hideLoading(); //consistent
          if (!response.ok) {
            const errorData = await response.json(); // Await here also
            throw new Error(errorData.message || "Registration failed");
          }
          const data = await response.json();
          console.log("Registration successful:", data);
          alert("Registration successful! Check console for user data");
          formElement.reset();
          //router.push("/login"); // Use vue router
          window.location.href = "/account/login.html"

        } catch (error) {
          hideLoading();
        
            if (error.message === "Invalid file type. Only JPEG, PNG, PDF, and DOCX files are allowed.") {
              errorMessages.profile.textContent = error.message;
            } else if (error.message === "Profile picture is required") {
                errorMessages.profile.textContent = error.message;
            } else {
              displayErrors(error.errors || [{ msg: error.message || "An error occurred" }]);
            }
        }
      }

              
        
    
}