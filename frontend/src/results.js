document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("fetch-results");
    const resultsContainer = document.getElementById("results-container");

    button.addEventListener("click", async () => {
        try {
            const response = await fetch("http://localhost:3000/api/results");
            if (!response.ok) throw new Error("Failed to fetch");

            const data = await response.json();
            resultsContainer.innerHTML = `
                <h3 class="text-success">Results:</h3>
                <p>DOA: ${data.doa_rad}</p>
            `;
        } catch (error) {
            console.error("Error fetching results:", error);
            resultsContainer.innerHTML = `<p class="text-danger">Failed to load results. Please try again.</p>`;
        }
    });
});
