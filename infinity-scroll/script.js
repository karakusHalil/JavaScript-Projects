
// Unsplash API

const count = 10;
const apiKey = `NNU6uKwURL_hypKU6kxPoB4HqT9fWuCJqTNyQYbXFZY`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


//On Load
getPhotos();