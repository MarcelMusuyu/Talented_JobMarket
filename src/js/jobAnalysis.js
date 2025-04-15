

import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ExternalServices.mjs";
import ApplicationDetails from "./ApplicationDetails.mjs";


loadHeaderFooter();
const dataSource = new ProductData();
const applicationtId = getParam("application");
const application = new ApplicationDetails(applicationtId,dataSource);
application.init();
document.addEventListener("DOMContentLoaded", (event) => {
                const documents = ["resumeCV","coverLetter", "transcript"];
                const urls = application.documentsURL() || ["https://github.com/MarcelMusuyu/Talented_JobMarketAPI/blob/main/src/job_process/Resume.pdf",
                    "https://github.com/MarcelMusuyu/Talented_JobMarket/blob/main/src/job_process/coverLetter.pdf",
                    "https://github.com/MarcelMusuyu/Talented_JobMarket/blob/main/src/job_process/transcript.pdf"
                ]
                let count = 0;
                if(documents.length == 3 && urls.length == 3){
                    documents.forEach((file)=>{
                        document.getElementById(file).addEventListener("click", function(e) {

                        const url = urls[count];
                        count++;
                        const canvas = document.getElementById(`pdf-render${count}`);
                        
                        const prev = document.querySelector(`#prev-page${count}`);
                        const next = document.querySelector(`#next-page${count}`);
                        const counter = document.querySelector(`#page-num1${count}`);
                        
                        printPDF(url, canvas, prev, next, counter)
                    });
                    });
            }
               


                // document.getElementById("coverLetter").addEventListener("click", function(e) {

                //     const url = "https://github.com/MarcelMusuyu/Talented_JobMarket/blob/main/src/job_process/Resume.pdf";
                //     const canvas4 = document.getElementById("pdf-render4");
                 
                //     const prev = document.querySelector("#prev-page4");
                //    const  next = document.querySelector("#next-page4");
                //     const count = document.querySelector("#page-num4");
                      
                //     printPDF(url, canvas4, prev, next, count)
                // });

            });

    const printPDF = function(url, canvas, prev, next, count) {

        let pdfDoc = null,
            pageNum = 1,
            pageIsRendering = false,
            pageNumIsPending = null;

        const scale = 1.2,

           
            ctx = canvas.getContext("2d");

        const renderPage = num => {
            pageIsRendering = true;

            pdfDoc.getPage(num).then(page => {
                // Set scale

                const viewport = page.getViewport({
                    scale
                });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderCtx = {
                    canvasContext: ctx,
                    viewport
                }
                page.render(renderCtx).promise.then(() => {
                    pageIsRendering = false;
                    if (pageNumIsPending !== null) {
                        renderPage(pageNumIsPending);
                        pageNumIsPending = null;
                    }
                });
                // Output current page
                count.textContent = num;

            });
            // Get page

        };

        // Check for pages rendering
        const queueRenderPage = num => {
            if (pageIsRendering) {
                pageNumIsPending = num;

            } else {
                renderPage(num);
            }
        }

        //Shwo Prev page
        const showPrevPage = () => {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        }

        //Show Next page
        const showNextPage = () => {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        }


        pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;
          
            count.textContent = pdfDoc.numPages;
            renderPage(pageNum)
        }).catch(err => {
            //Display error
            const div = document.createElement("div");
            div.className = "error";
            div.appendChild(document.createTextNode(err.message));
            //  canvas = document.querySelector("#pdf-render2");
            // document.querySelector("body").insertBefore(div, canvas);
            console.log("failed To load File");
            //Remove top bar
            // document.querySelector(".top-bar").style.display = "none";
        });

        //Button events
        prev.addEventListener("click", showPrevPage);
        next.addEventListener("click", showNextPage);

    }