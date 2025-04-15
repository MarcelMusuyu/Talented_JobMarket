const baseURL = import.meta.env.VITE_SERVER_URL

 
function convertToJson(res) {
  console.log(res);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}


import { getParam } from "./utils.mjs";

export default class ExternalServices {
  constructor() {
   
  }

  async login(payload){
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
     const formData = new FormData(payload);

  // // Append text fields to the FormData object
  // for (const key in payload) {
  //   if (payload.hasOwnProperty(key) && key !== "file") { // Exclude the file from this loop
  //     formData.append(key, payload[key]);
  //   }
  // }

  // // Append the file to the FormData object
  // if (payload.file) {
  //   formData.append("profile", payload.file); // 'file' is the field name the server expects
  // }

  const options = {
    method: "POST",
    body: formData, // Use FormData as the body
    // Do NOT set Content-Type: 'application/json' - the browser will do it
  };
  const result = await fetch(`${baseURL}user/register`, options);
  let data = null; 
  if (result) {
    data = convertToJson(result);
    console.log(data);  
    return data;
  }else{
    console(result);
    return null;
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
     const formData = new FormData(payload);

     const jobOpportunity = getParam("job");
     formData.append("jobOpportunity",jobOpportunity);
  // Append text fields to the FormData object
  // for (const key in payload) {
  //   if (payload.hasOwnProperty(key) && key !== "file") { // Exclude the file from this loop
  //     formData.append(key, payload[key]);
  //   }
  // }

  // // Append the file to the FormData object
  // if (payload.file) {
  //   formData.append("profile", payload.file); // 'file' is the field name the server expects
  // }
    const options = {
      method: "POST",
      headers: {
     
         "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: formData,
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
