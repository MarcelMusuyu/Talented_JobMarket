import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./JobList.mjs";

import {  loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
// first create an instance of the ExternalServices class.
const dataSource = new ExternalServices();


// then get the element you want the product list to render in
const listElement = document.querySelector("#job_announcement");
// then create an instance of the ProductList class and send it the correct information.
if(listElement) {
    const productList = new ProductList(dataSource, listElement);

// finally call the init method to show the products
productList.init();
}



 


