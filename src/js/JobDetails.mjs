

export default class JobDetails {
  constructor(jobId, dataSource) {
    this.jobId = jobId;
    this.job = {};
    this.dataSource = dataSource;
  }

    async init() {
         
    try {
      // Use the datasource to get the details for the current product.
      // findProductById will return a promise! use await or .then() to process it
      this.job = await this.dataSource.getJobOpportunityById(this.jobIdId);

     
      // The product details are needed before rendering the HTML
      this.renderJobDetails();

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
        

  

  renderJobDetails() {
       

        
        // Populate the cloned template with product data
        document.querySelector("#recruiter").textContent = this.job.enterprise;
        document.querySelector("#status").textContent = this.job.status;
        document.querySelector("#location").textContent = this.job.location;
        document.querySelector("#contract").textContent = this.job.location;
        document.querySelector("#job_title").textContent = this.job.title ;
        document.querySelector("#experience").textContent = this.job.experience;
        document.querySelector("#requirements").innerHTML = this.job.skills.join("");
        document.querySelector("#apply").dataset.id = this.job.Id;
        document.querySelector("#apply").setAttribute("href",`/job_process/send_application.html?job=${this.job.Id}`)
        document.querySelector("#responsibilities").innerHTML = this.job.responsibilities.join("");
        document.querySelector("#description").innerHTML = this.job.description;
        document.querySelector("#education").innerHTML = this.job.education;
          document.querySelector("#salary").innerHTML = this.job.salary;
            document.querySelector("#closingDate").innerHTML = this.job.clossingDate;

        
}


}