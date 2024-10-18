//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
// Function to download a single image and return a promise
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img); // Resolve when the image loads
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`); // Reject if image fails to load
  });
}

// Function to download all images in parallel and display them
function downloadAllImages() {
  const downloadPromises = images.map((image) => downloadImage(image));

  // Use Promise.all to download all images in parallel
  Promise.all(downloadPromises)
    .then((loadedImages) => {
      output.innerHTML = ''; // Clear the output area
      loadedImages.forEach((img) => output.appendChild(img)); // Append each loaded image to the output div
    })
    .catch((error) => {
      output.innerHTML = `<p>${error}</p>`; // Display error message if any image fails to load
    });
}

// Event listener for the button click
btn.addEventListener("click", downloadAllImages);
