import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

import Application from "./ApplicationList.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();

const grid = document.querySelector("#job_container_grid");
if(grid){
  const application_list = new Application(dataSource.getApplications(),grid);
  application_list.renderApplicationGrid();
}

const list = document.querySelector("#job_container_list");
if(list){
  const application_list = new Application(dataSource.getApplications(),list);
  application_list.renderApplicationList();
}
