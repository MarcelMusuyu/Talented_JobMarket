document.addEventListener("DOMContentLoaded", (event) => {
           
                document.getElementById("resumeCV").addEventListener("click", function(e) {

                    const url = "http://localhost:5173/job_process/Resume.pdf";
                     const canvas1 = document.getElementById("pdf-render1");
                    
                    const prev = document.querySelector("#prev-page1");
                    const next = document.querySelector("#next-page1");
                    const count = document.querySelector("#page-num1");
                     
                    printPDF(url, canvas1, prev, next, count)
                });

                document.getElementById("coverLetter").onload = function () {
                    const url = "http://localhost:5173/job_process/Resume.pdf";
                     const canvas1 = document.getElementById("pdf-render1");
                    
                    const prev = document.querySelector("#prev-page1");
                    const next = document.querySelector("#next-page1");
                    const count = document.querySelector("#page-num1");
                     
                    printPDF(url, canvas1, prev, next, count)

                 };
                
                document.getElementById("transcript").addEventListener("click", function(e) {

                    const url = "http://localhost:5173/job_process/Resume.pdf";
                    const canvas3 = document.getElementById("pdf-render3");
                     
                    const prev = document.querySelector("#prev-page3");
                    const next = document.querySelector("#next-page3");
                   const count = document.querySelector("#page-num3");
                     
                    printPDF(url, canvas3, prev, next, count)
                });

                document.getElementById("coverLetter").addEventListener("click", function(e) {

                    const url = "http://localhost:5173/job_process/Resume.pdf";
                    const canvas4 = document.getElementById("pdf-render4");
                 
                    const prev = document.querySelector("#prev-page4");
                   const  next = document.querySelector("#next-page4");
                    const count = document.querySelector("#page-num4");
                      
                    printPDF(url, canvas4, prev, next, count)
                });

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