const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = 'p7Go-3o7kRPqR4MiFZIETriPXXVV8LWtyyn_MZGaw7E';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// Check if all images were loaded

function imageLoaded() {
    // console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    console.log(`ready = ${ready}`);
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, and add to the DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log(`total images ${totalImages}`);
    // Run function for each object in photos array
    photosArray.forEach((photo) => {
     // Create <a> to link to Unsplash
     const item = document.createElement('a');
     setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
     });
    //  item.setAttribute('href', photo.links.html);
    //  item.setAttribute('target', '_blank');
     // Create <img> for photo
     const image = document.createElement('img');
     setAttributes(image, {
        src: photo.urls.regular,
        alt: photo.alt_description, 
        title: photo.alt_description, 
     });
     // Event Listener, check when each is finished loading 
     image.addEventListener('load', imageLoaded);
    //  image.setAttribute('src', photo.urls.regular);
    //  image.setAttribute('alt', photo.alt_description);
    //  image.setAttribute('title', photo.alt_description);
     // Put <img> inside <a>, then put both inside imageContainer element
     item.appendChild(image);
     imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API

async function getPhotos() {
    try {
       const response = await fetch(apiUrl);
       photosArray = await response.json();
       displayPhotos();
    } catch (error) {

    };
};

// Check to see if scrolling near bottom of the page, Load more photos

window.addEventListener('scroll', () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
}
});

// On Load

getPhotos();