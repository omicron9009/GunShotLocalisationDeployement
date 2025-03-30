// document.addEventListener("DOMContentLoaded", function () {
//     const backendURL = "http://127.0.0.1:5000"; // Replace with your Render backend URL

//     document.getElementById("uploadForm").addEventListener("submit", async function (event) {
//         event.preventDefault(); // Prevent default form submission

//         // Get form data
//         let formData = new FormData(this);

//         // Show loading message
//         let resultsDiv = document.getElementById("results");
//         resultsDiv.innerHTML = `<p class="text-warning text-center">Processing... Please wait.</p>`;

//         try {
//             // Send the file to the backend
//             let response = await fetch(backendURL + "/upload", {
//                 method: "POST",
//                 body: formData,
//                 headers: {
//                     "Accept": "application/json"
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error("File upload failed!");
//             }

//             let data = await response.json();

//             // Display results
//             resultsDiv.innerHTML = `
//                 <h3 class="text-success text-center">Gunshot Detected!</h3>
//                 <p><strong>Latitude:</strong> ${data.gunshot_lat}</p>
//                 <p><strong>Longitude:</strong> ${data.gunshot_long}</p>
//                 <p><strong>DOA (radians):</strong> ${data.doa_rad}</p>
//                 <p><strong>X Coordinate:</strong> ${data.x}</p>
//                 <p><strong>Y Coordinate:</strong> ${data.y}</p>

//                 <div class="row text-center mt-3">
//                     <div class="col-md-6">
//                         <h4>Polar Plot:</h4>
//                         <img src="${backendURL}/fetch_plot/polar.png" alt="Polar Plot" class="img-fluid rounded shadow">
//                     </div>
//                     <div class="col-md-6">
//                         <h4>Cartesian Plot:</h4>
//                         <img src="${backendURL}/fetch_plot/cartesian.png" alt="Cartesian Plot" class="img-fluid rounded shadow">
//                     </div>
//                 </div>
//             `;
//         } catch (error) {
//             console.error("Error:", error);
//             resultsDiv.innerHTML = `<p class="text-danger text-center">Error processing the file. Please try again.</p>`;
//         }
//     });
// });


document.addEventListener("DOMContentLoaded", function () {
    const backendURL = "http://127.0.0.1:5000";

    document.getElementById("uploadForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        let formData = new FormData(this);
        let resultsDiv = document.getElementById("results");

        resultsDiv.innerHTML = `<p class="text-warning text-center">Processing... Please wait.</p>`;

        try {
            let response = await fetch(backendURL + "/upload", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("File upload failed!");
            }

            let data = await response.json();

            resultsDiv.innerHTML = `
                <h3 class="text-success text-center">Gunshot Detected!</h3>
                <p><strong>Latitude:</strong> ${data.gunshot_lat}</p>
                <p><strong>Longitude:</strong> ${data.gunshot_long}</p>
                <p><strong>DOA (radians):</strong> ${data.doa_rad}</p>
                <p><strong>X Coordinate:</strong> ${data.x}</p>
                <p><strong>Y Coordinate:</strong> ${data.y}</p>

                <div class="row text-center mt-3">
                    <div class="col-md-6">
                        <h4>Polar Plot (PNG):</h4>
                        <img src="data:image/png;base64,${data.polar_plot_image}" alt="Polar Plot" class="img-fluid rounded shadow">
                    </div>
                    <div class="col-md-6">
                        <h4>Cartesian Plot (PNG):</h4>
                        <img src="data:image/png;base64,${data.cartesian_plot_image}" alt="Cartesian Plot" class="img-fluid rounded shadow">
                    </div>
                </div>
            `;
        } catch (error) {
            console.error("Error:", error);
            resultsDiv.innerHTML = `<p class="text-danger text-center">Error processing the file. Please try again.</p>`;
        }
    });
});
