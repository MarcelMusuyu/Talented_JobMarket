const baseURL = import.meta.env.VITE_SERVER_URL

 
function convertToJson(res) {
  
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
const loadingIndicator = document.getElementById("loading");
function showLoading() {
            if(loadingIndicator){
               loadingIndicator.style.display = "flex";
              document.querySelector("#registerSubmit").disabled = true;
            }
           
  }

  function hideLoading() {
        if(loadingIndicator){
            loadingIndicator.style.display = "none";
            document.querySelector("#registerSubmit").disabled = false;
        }
    }



export default class ExternalServices {
  constructor() {
   
  }

  async login(payload){
    showLoading();  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}user/login`, options).then(convertToJson);
  };
  
  async register(payload){
    //  const formData = new FormData(payload);
   const formData = new FormData(payload);
  const profileInput = document.querySelector(`input[type="file"][name="profile"]`);
   const profileFile = profileInput.files[0];

  formData.delete("profile");  // Remove the empty profile
  formData.append("profile", profileFile); // Append the actual file

     showLoading();      
    try {
    const response = await fetch(`${baseURL}user/register`, {
      method: "POST",
      body: formData,
    });
    return response; // Return the Response object
  } catch (error) {
    hideLoading();
    throw error; // Re-throw the error to be caught in the component
  }
  
  
  }

  async getJobOpportunies() {
     const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    };
    const response = await fetch(`${baseURL}recruitments`,options);
  const data = await convertToJson(response);
  return data;
  }
  
  async getJobOpportunityById(id) {
     const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    };
    const response = await fetch(`${baseURL}recruitments/${id}`,options);
  const data = await convertToJson(response);
  return data;
  }

  async getJobOpportunityByStatus(status) {
     const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    };
    const response = await fetch(`${baseURL}recruitments/status/${status}`,options);
  const data = await convertToJson(response);
  return data;
  }

  async addJobOpportunity(payload){
    // showLoading();  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}recruitments`, options).then(convertToJson);
  }

   async updateJobOpportunity(payload,id){
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}recruitments/${id}`, options).then(convertToJson);
  }

  async deleteJobOpportunity(id){
     const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    };
    return await fetch(`${baseURL}recruitments/${id}`, options).then(convertToJson);
  }

  async getApplications() {
     const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    };
    const response = await fetch(`${baseURL}applications`,options);
    const data = await convertToJson(response);
    return data;
  }

  async getApplicationById(id) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    };
    const response = await fetch(`${baseURL}applications/${id}`,options);
    const data = await convertToJson(response);
    return data;
  }


  async sendApplication(payload){
  
  
    const options = {
      method: "POST",
      headers: {
     
         "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: payload,
    };
    return await fetch(`${baseURL}applications`, options).then(convertToJson);
  }

  async updateApplication(payload,id){
     const formData = new FormData(payload);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: formData,
    };
    return await fetch(`${baseURL}applications/${id}`, options).then(convertToJson);
  }

  async deleteApplication(id){
     const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    };
    return await fetch(`${baseURL}applications/${id}`, options).then(convertToJson);
  }

  async getApplicationsByIdCandidate(id){
     const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    };
    const response = await fetch(`${baseURL}applications/candidates/${id}`,options);
    const data = await convertToJson(response);
    return data;
  }

  async getJobOpportuniesNotification(id){
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }
    const response = await fetch(`${baseURL}recruitments/${id}/notifications`,options);
    const data = await convertToJson(response);
    return data;
  }

   async createJobOpportuniesNotification(id){
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }
    const response = await fetch(`${baseURL}recruitments/${id}/notifications`,options);
    const data = await convertToJson(response);
    return data;
  }

  async updateNotificationById(id){
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }
    const response = await fetch(`${baseURL}recruitments/notifications/${id}`,options);
    const data = await convertToJson(response);
    return data;
  }

  async deleteNotificationById(id){
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }
    const response = await fetch(`${baseURL}recruitments/notifications/${id}`,options);
    const data = await convertToJson(response);
    return data;
  }
  // async getData(category) {
  //   const response = await fetch(`${baseURL}/ `);
  // const data = await convertToJson(response);
  // return data.Result;
  // }
  // async findProductById(id) {
  //  const response = await fetch(`${baseURL}/${id}`);
  //   const data = await convertToJson(response);
   
  //   return data.Result;
  // }

  // async checkout(payload){
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   };
  //   return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  // };
  
}
