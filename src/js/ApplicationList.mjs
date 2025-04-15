// ShoppingCart.mjs

export default class ApplicationList {
  constructor(applications, containerSelector) {
    this.applications = applications;
   
    this.container = containerSelector;
  }

  renderApplicationGrid() {
    this.container.innerHTML = ""; // Clear existing content

    if (this.applications && this.applications.length > 0) {
      this.applications.forEach(item => {
        const application = `
             <div class="col-md-6 col-lg-4 col-xl-3">
                                    <div class="profile-widget">
                                        <div class="user-avatar">
                                            <a href="/job_process/application_details.html/?application=${item._id}">
                                                <img class="img-fluid" alt="User Image" src="${item.profile}" />
                                            </a>
                                            <a href="javascript:void(0)" class="fav-btn">
                                                <i class="far fa-bookmark"></i>
                                            </a>
                                        </div>
                                        <div class="pro-content">
                                            <h3 class="title">
                                                <a href="/job_process/application_details.html/?application=${item._id}">Julia Washington</a>
                                                <i class="fas fa-check-circle verified"></i>
                                            </h3>
                                            <p class="speciality">${item.title}</p>
                                            <div class="rating">
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star"></i>
                                                <span class="d-inline-block average-rating">(5)</span>
                                            </div>
                                            <ul class="available-info">
                                                <li><i class="fas fa-map-marker-alt"></i> ${item.email}</li>
                                                <li><i class="far fa-clock"></i> Available on ${item.appliedDate}</li>
                                                <li>
                                                    <i class="far fa-money-bill-alt"></i> ${item.status}
                                                    <i class="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i>
                                                </li>
                                            </ul>
                                            <div class="row row-sm">
                                                <div class="col-6">
                                                    <a href="/job_process/application_details.html/?application=${item._id}" class="btn book-btn">View Application</a>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
        `;

        this.container.appendChild(application);
      });
    } else {
      this.container.innerHTML = "<p>Your cart is empty.</p>";
    }

    
  }


    renderApplicationList() {
        this.container.innerHTML = ""; 

        if (this.applications && this.applications.length > 0) {
          this.applications.forEach(item => {
            const application = 
                 `<tr>
                     <td>
                        <h2 class="table-avatar">
                            <a href="/job_process/application_details.html/?application=${item._id}" class="avatar avatar-sm me-2"><img class="avatar-img rounded-circle" src="${item.profile}" alt="User Image" /></a>
                            <a href="/job_process/application_details.html/?application=${item._id}">${item.firstname} <span>${item.email}</span></a>
                        </h2>
                     </td>
                     <td>${item.appliedDate}</td>
                    <td class="text-center"><span class="accept">${item.status}</span></td>
                        <td class="text-center">
                            <a href="/job_process/application_details.html/?application=${item._id}" class="btn btn-sm bg-info-light"><i class="far fa-eye"></i> View</a>
                    </td>
                  </tr>
            `;

            this.container.appendChild(application);
          });
        } else {
          this.container.innerHTML = "<p>Your cart is empty.</p>";
        }

        
      }





  
}