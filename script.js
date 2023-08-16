const fetchButton = document.getElementById("fetchButton");
const breedSelect = document.getElementById("breedSelect");
const dogImage = document.getElementById("dogImage");

// Fetch all dog breeds from the API
fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            const breeds = data.message;
            populateDropdown(breeds);
        } else {
            console.error("Failed to fetch dog breeds");
        }
    })
    .catch(error => {
        console.error("Error fetching dog breeds:", error);
    });

fetchButton.addEventListener("click", () => {
    const selectedBreed = breedSelect.value;
    const apiUrl = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const imageUrl = data.message;
                dogImage.src = imageUrl;
            } else {
                console.error(`Failed to fetch ${selectedBreed} dog image`);
            }
        })
        .catch(error => {
            console.error(`Error fetching ${selectedBreed} dog image:`, error);
        });
});

function populateDropdown(breeds) {
    for (const breed in breeds) {
        if (breeds[breed].length === 0) {
            const option = document.createElement("option");
            option.value = breed;
            option.textContent = breed;
            breedSelect.appendChild(option);
        } else {
            breeds[breed].forEach(subBreed => {
                const option = document.createElement("option");
                option.value = `${breed}/${subBreed}`;
                option.textContent = `${subBreed} ${breed}`;
                breedSelect.appendChild(option);
            });
        }
    }
}
