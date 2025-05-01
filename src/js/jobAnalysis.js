import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ExternalServices.mjs";
import ApplicationDetails from "./ApplicationDetails.mjs";
// Assuming pdf.js is loaded globally or imported if using a module bundler
// Example: import * as pdfjsLib from 'path/to/pdf.mjs';
// Make sure pdfjsLib is accessible where printPDF is defined.

/**
 * Renders a PDF page onto a canvas element.
 * @param {string} url - The URL of the PDF document.
 * @param {HTMLCanvasElement} canvas - The canvas element to render onto.
 * @param {HTMLElement} prevButton - The button to go to the previous page.
 * @param {HTMLElement} nextButton - The button to go to the next page.
 * @param {HTMLElement} pageCounterElement - The element to display the current page number.
 */
// const printPDF = (url, canvas, prevButton, nextButton, pageCounterElement) => {
//     let pdfDoc = null,
//         pageNum = 1,
//         pageIsRendering = false,
//         pageNumIsPending = null;

//     const scale = 1.2, // Adjust scale as needed
//         ctx = canvas.getContext("2d");

//     // Render the page
//     const renderPage = num => {
//         pageIsRendering = true;

//         pdfDoc.getPage(num).then(page => {
//             const viewport = page.getViewport({ scale });
//             canvas.height = viewport.height;
//             canvas.width = viewport.width;

//             const renderCtx = {
//                 canvasContext: ctx,
//                 viewport
//             };
//             page.render(renderCtx).promise.then(() => {
//                 pageIsRendering = false;
//                 if (pageNumIsPending !== null) {
//                     renderPage(pageNumIsPending);
//                     pageNumIsPending = null;
//                 }
//             });

//             // Update page counter display
//             pageCounterElement.textContent = `Page ${num} of ${pdfDoc.numPages}`; // More informative
//         }).catch(err => {
//             console.error("Error rendering page:", err);
//             pageIsRendering = false; // Ensure state is reset on error
//              pageCounterElement.textContent = "Error";
//         });
//     };

//     // Queue rendering
//     const queueRenderPage = num => {
//         if (pageIsRendering) {
//             pageNumIsPending = num;
//         } else {
//             renderPage(num);
//         }
//     };

//     // Show previous page
//     const showPrevPage = () => {
//         if (pageNum <= 1) return;
//         pageNum--;
//         queueRenderPage(pageNum);
//     };

//     // Show next page
//     const showNextPage = () => {
//         if (pageNum >= pdfDoc.numPages) return;
//         pageNum++;
//         queueRenderPage(pageNum);
//     };

//     // Add event listeners (only once per printPDF call)
//     // Remove previous listeners if any (to avoid duplicates if called multiple times for same elements)
//     prevButton.replaceWith(prevButton.cloneNode(true)); // Simple way to remove old listeners
//     nextButton.replaceWith(nextButton.cloneNode(true));
//     // Re-select the cloned buttons to add new listeners
//     const newPrevButton = document.getElementById(prevButton.id);
//     const newNextButton = document.getElementById(nextButton.id);
//     if(newPrevButton) newPrevButton.addEventListener("click", showPrevPage);
//     if(newNextButton) newNextButton.addEventListener("click", showNextPage);


//     // Get the document
//     // Ensure you have the pdfjsLib object available (e.g., from a global script include or import)
//     if (typeof pdfjsLib === 'undefined') {
//          console.error("pdf.js library (pdfjsLib) is not loaded.");
//          pageCounterElement.textContent = "PDF library missing";
//          return;
//     }
//     // // Set workerSrc if needed (essential for pdf.js)
//     // pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsLib.GlobalWorkerOptions.workerSrc || 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js'; // Example CDN, adjust path as needed

//     pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
//         pdfDoc = pdfDoc_;
//         pageCounterElement.textContent = `Page ${pageNum} of ${pdfDoc.numPages}`;
//         renderPage(pageNum);
//     }).catch(err => {
//         console.error(`Failed to load PDF from ${url}:`, err);
//         const div = document.createElement("div");
//         div.className = "error";
//         // Check if canvas exists before inserting error message
//         if (canvas && canvas.parentNode) {
//              div.appendChild(document.createTextNode(`Error loading PDF: ${err.message}. Check console for details.`));
//              // Insert error message before the canvas
//              canvas.parentNode.insertBefore(div, canvas);
//         } else {
//             // Fallback if canvas isn't found or attached
//              pageCounterElement.textContent = "Error loading PDF";
//         }
//     });
// };


// // --- Main Execution Logic ---
// // Use an async IIFE to handle top-level await
// (async () => {
//     try {
//         // Load common elements first
//         await loadHeaderFooter(); // Assuming this might be async

//         // Initialize data source and application details object
//         const dataSource = new ProductData();
//         const applicationtId = getParam("application"); // Ensure getParam works correctly
//         if (!applicationtId) {
//             console.error("Application ID not found in URL parameters.");
//             // Display error to user or redirect
//             document.body.innerHTML = "Error: Application ID is missing.";
//             return; // Stop execution
//         }
//         const application = new ApplicationDetails(applicationtId, dataSource);

//         // --- IMPORTANT: Wait for application data to load ---
//         await application.init();
//         console.log("Application data initialized:", application.application);

//         // --- Get the URLs AFTER init() has finished ---
//         // getdocumentsURL should populate and return the internal array
//         let urls = application.getdocumentsURL();
//         console.log("Fetched URLs:", urls);

//         // --- Define the clickable element IDs ---
//         const documentElementIds = ["resumeCV", "coverLetter", "transcript"];

//         // --- Apply Fallback URLs if necessary ---
//         // Check if the fetched URLs are empty or invalid
//         if (!urls || !Array.isArray(urls) || urls.length !== documentElementIds.length) {
//              console.warn(`Application details did not contain the expected number (${documentElementIds.length}) of document URLs. Using fallback URLs.`);
//              urls = [ // Ensure these URLs are correct and accessible
//                  "https://github.com/MarcelMusuyu/Talented_JobMarketAPI/blob/main/src/job_process/Resume.pdf", // Check if these need ?raw=true
//                  "https://github.com/MarcelMusuyu/Talented_JobMarket/blob/main/src/job_process/coverLetter.pdf",
//                  "https://github.com/MarcelMusuyu/Talented_JobMarket/blob/main/src/job_process/transcript.pdf"
//              ];
//              // If even the fallback should have the same length, add a check here too.
//              if (urls.length !== documentElementIds.length) {
//                  console.error("Fallback URLs array length does not match document elements array length. Cannot proceed.");
//                  return;
//              }
//         }

//         console.log("Using URLs for PDF rendering:", urls);


//         // --- Setup Event Listeners Correctly ---
//         // Wait for the DOM to be ready before accessing elements
//         document.addEventListener("DOMContentLoaded", (event) => {
//             console.log("DOMContentLoaded event fired. Setting up PDF click listeners.");
//             documentElementIds.forEach((elementId, index) => {
//                 const clickableElement = document.getElementById(elementId);

//                 if (clickableElement) {
//                     // Get the specific URL for this element using the index
//                     const specificUrl = urls[index];
//                     // Determine the index for corresponding elements (e.g., pdf-render1, pdf-render2)
//                     const elementIndex = index + 1;

//                     // Find the associated canvas and controls
//                     const canvas = document.getElementById(`pdf-render${elementIndex}`);
//                     const prevButton = document.querySelector(`#prev-page${elementIndex}`);
//                     const nextButton = document.querySelector(`#next-page${elementIndex}`);
//                     const pageCounter = document.querySelector(`#page-num${elementIndex}`); // Verify this ID pattern matches HTML

//                     // Check if all necessary elements exist before adding listener
//                     if (canvas && prevButton && nextButton && pageCounter) {
//                          clickableElement.addEventListener("click", function(e) {
//                              console.log(`Clicked ${elementId}, attempting to render PDF from ${specificUrl} on canvas pdf-render${elementIndex}`);
//                              // Call printPDF with the *specific* URL and elements for this button
//                              printPDF(specificUrl, canvas, prevButton, nextButton, pageCounter);
//                          });
//                          console.log(`Added click listener for ${elementId}`);
//                     } else {
//                         console.error(`Could not find all required PDF rendering elements for index ${elementIndex} (Canvas: ${!!canvas}, Prev: ${!!prevButton}, Next: ${!!nextButton}, Counter: ${!!pageCounter}). Check IDs: pdf-render${elementIndex}, prev-page${elementIndex}, next-page${elementIndex}, page-num${elementIndex}`);
//                     }
//                 } else {
//                     console.warn(`Could not find clickable element with ID: ${elementId}`);
//                 }
//             });
//         });

//     } catch (error) {
//         console.error("An error occurred during application initialization or setup:", error);
//         // Display a user-friendly error message on the page
//          document.body.innerHTML = `Failed to load application details. Please try again later. Error: ${error.message}`;
//     }
// })(); // Immediately invoke the async function


// (async () => {
//     try {
//         // Load common elements first
//         await loadHeaderFooter(); // Assuming this might be async

//         // Initialize data source and application details object
//         const dataSource = new ProductData();
//         const applicationtId = getParam("application"); // Ensure getParam works correctly
//         if (!applicationtId) {
//             console.error("Application ID not found in URL parameters.");
//             // Display error to user or redirect
//             document.body.innerHTML = "Error: Application ID is missing.";
//             return; // Stop execution
//         }
//         const application = new ApplicationDetails(applicationtId, dataSource);

//         // --- IMPORTANT: Wait for application data to load ---
//         await application.init();
//         console.log("Application data initialized:", application.application);

//         // --- Get the URLs AFTER init() has finished ---
//         // getdocumentsURL should populate and return the internal array
//         let urls = application.getdocumentsURL();
//         console.log("Fetched URLs:", urls);

        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsLib.GlobalWorkerOptions.workerSrc ; 


            document.querySelector("#coverLetter").addEventListener("click", function(e) {
                const url = "http://localhost:5173/job_process/resume.pdf"
                const canvas = document.querySelector("#pdf-render2")
                const prev = document.querySelector("#prev-page2")
                const next = document.querySelector("#next-page2")
                const count = document.querySelector("#page-num2");

                printPDF(url, canvas, prev, next, count)
            });

            document.addEventListener("DOMContentLoaded", (event) => {

                const url = "http://localhost:5173/job_process/resume.pdf"
                const canvas = document.querySelector("#pdf-render1")
                const prev = document.querySelector("#prev-page1")
                const next = document.querySelector("#next-page1")
                const count = document.querySelector("#page-num1");

                printPDF(url, canvas, prev, next, count)
            });

            document.querySelector("#resumeCV").addEventListener("click", function(e) {

                const url = "http://localhost:5173/job_process/resume.pdf"
                const canvas = document.querySelector("#pdf-render1")
                const prev = document.querySelector("#prev-page1")
                const next = document.querySelector("#next-page1")
                const count = document.querySelector("#page-num1");

                printPDF(url, canvas, prev, next, count)
            });


            document.querySelector("#transcript").addEventListener("click", function(e) {

                const url = "http://localhost:5173/job_process/resume.pdf"
                const canvas = document.querySelector("#pdf-render3")
                const prev = document.querySelector("#prev-page3")
                const next = document.querySelector("#next-page3")
                const count = document.querySelector("#page-num3");

                printPDF(url, canvas, prev, next, count)
            });

        
            
            const printPDF = function(url, canvas, prev, next, count) {

                let pdfDoc = null;
                let   pageNum = 1;
                let  pageIsRendering = false;
                let  pageNumIsPending = null;

                const scale = 1.2;

                    //canvas2 = document.querySelector("#pdf-render2"),
                const  ctx = canvas.getContext("2d");

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
                    canvas.parentNode.insertBefore(div, canvas);
                    //document.querySelector("body").insertBefore(div, canvas);
                    //Remove top bar
                    //document.querySelector(".top-bar").style.display = "none";
                });

                //Button events
                prev.addEventListener("click", showPrevPage);
                next.addEventListener("click", showNextPage);

            }

