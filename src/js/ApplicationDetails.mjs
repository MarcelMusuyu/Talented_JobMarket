

export default class ApplicationDetails {
  constructor(applicationId, dataSource) {
    this.applicationId = applicationId;
    this.application = {};
    this.documentsURL = [];
    this.dataSource = dataSource;
  }

    async init() {
         
    try {
      // Use the datasource to get the details for the current product.
      // findProductById will return a promise! use await or .then() to process it
      this.application = await this.dataSource.getApplicationById(this.applicationId);

     
      // The product details are needed before rendering the HTML
      this.renderApplicationDetails();
      this.documentsURL();

      // Once the HTML is rendered, add a listener to the Add to Cart button
      // Notice the .bind(this). This callback will not work if the bind(this) is missing.
      // Review the readings from this week on 'this' to understand why.
    //   document.getElementById("addToCart")
    //     .addEventListener("click", this.addToCart.bind(this));
    } catch (error) {
       //console.error(error);
      // Handle error gracefully (e.g., display an error message to the user)
    }
  }
        

  

  renderApplicationDetails() {
       

        
        // Populate the cloned template with product data
        document.querySelector("#skills").innerHTML = this.application.skills.join("<br>");
        document.querySelector("#status").textContent = this.application.status;
        document.querySelector("#languages").innerHTML = this.application.languages.join("<br>");
         //document.querySelector(".firstname").textContent = this.application.firstname;
         //document.querySelector(".email").textContent = this.application.email;
         //document.querySelector("#profile").setAttributes("src",this.application.profile);
         //document.querySelector("#profile").setAttributes("alt","candidate profile");
        document.querySelector("#appliedDate").innerHTML = this.application.appliedDate;

        
}

getdocumentsURL(){
 // Check if the documents exist before trying to add them
  if (this.application.resume) {
    this.documentsURL.push(this.application.resume);
  }
  if (this.application.coverLetter) {
    this.documentsURL.push(this.application.coverLetter);
  }
  if (this.application.transcript) {
    this.documentsURL.push(this.application.transcript);
  }
  return this.documentsURL;
}


}