const baseURL = import.meta.env.VITE_SERVER_URL

 
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}




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
    return await fetch(`${baseURL}user/login/`, options).then(convertToJson);
  };
  
  async register(payload){
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}user/register/`, options).then(convertToJson);
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

  async updateApplication(payload,id){
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(payload),
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
