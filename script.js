const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const pathName = document.location.pathname;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'UA9wuwnEHNRPRGD_CahW5lgUcGAbNseLvGgbgMgmJdY';
var apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=code`;

if (pathName.includes("piano")) {
  apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=piano`;
} else if (pathName.includes("nightsky")) {
  apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=moon`;
} else if (pathName.includes("universe")) {
  apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=universe`;
} else if (pathName.includes("aurora")) {
  apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=aurora`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 3;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos then add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log(totalImages)
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })
    // Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a> then put <a> inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

// Check to see if scrolling near bottom of the page, load more photos
window.addEventListener('scroll', () => {
  // console.log('window.innerHeight: ', window.innerHeight);
  // console.log('window.scrollY: ', window.scrollY);
  // console.log('window.innerHeight + scrollY: ', window.innerHeight + window.scrollY);
  // console.log('document.body.offsetHeight - 1000: ', document.body.offsetHeight - 1000);
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && ready) {
    getPhotos();
    ready = false;
  }
});

// On load
getPhotos();