const baseURL = import.meta.env.VITE_SERVER_URL

 
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}




// POST
// /user/register

// POST
// /user/login

// GET
// /applications/candidates/{id}

// GET
// /applications/candidates

// GET
// /recruitments/status/{status}

// GET
// /recruitments/{jobOpportunityId}/notifications

// POST
// /recruitments/{jobOpportunityId}/notifications

// PUT
// /recruitments/notifications/{id}

// DELETE
// /recruitments/notifications/{id}

// GET
// /recruitments

// GET
// /recruitments/{id}

// PUT
// /recruitments/{id}

// DELETE
// /recruitments/{id}

// GET
// /applications

// GET
// /applications/{id}

// PUT
// /applications/{id}

// DELETE
// /applications/{id}

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
