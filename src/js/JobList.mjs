
function productCardTemplate(job,index) {
  return 
      `<div class="col-12 col-md-4 col-lg-3">
                                <div class="large-col">
                                    <a href="/job_process/job_detail.html/job=?${job.Id}" class="large-col-image">
                                        <div class="image-col-merge">
                                            <img src="/assets/img/path-img${index}.jpg" alt="" />
                                            <div class="text-col">
                                                <h5>${job.title}</h5>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>`
    
};

import { renderListWithTemplate } from "./utils.mjs";

export default class JobList {

    constructor(dataSource, listElement){
        this.dataSource = dataSource;
        this.listElement = listElement;
      
      }

      async init() {
         
    try {
        
       const list = await this.dataSource.getJobOpportunies();
         this.renderList(list);
    } catch (error) {
       //console.error(error);
      // Handle error gracefully (e.g., display an error message to the user)
    }
  }

    renderList(list) {

        if (list && list.length > 0) {
           let index = 1;
            list.forEach((job) => {
                renderListWithTemplate(productCardTemplate(job,index), this.listElement, "afterbegin", true);
                index++;
                
            });
          
        } else {
            this.listElement.innerHTML = "<p>No job found.</p>";
        }
       
    }


      post_Job(job){

      }

    


  

}