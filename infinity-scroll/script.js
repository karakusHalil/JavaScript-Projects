    const imageContainer = document.getElementById("image-container");
    const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = `NNU6uKwURL_hypKU6kxPoB4HqT9fWuCJqTNyQYbXFZY`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}


//Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  photosArray.forEach((photo) => {
    //Create <a> to link to Unplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    })
    //Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
        src : photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    })
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);

  });
}

//Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    photosArray = data;
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

//On Load
getPhotos();
