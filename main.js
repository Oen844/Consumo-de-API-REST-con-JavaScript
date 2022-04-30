const url = "https://api.thecatapi.com/v1/images/search";
// const button = document.querySelector("button");
const img = document.querySelector("img"); // getting the image element

// const createImg = () => {
//   fetch(url) // fetching the data from the API
//     .then((response) => response.json()) // converting the data to JSON
//     .then((data) => {
//       const cat = data[0].url; // getting the first cat from the array
//       img.setAttribute("src", cat); // setting the image source
//     });
// };
// createImg();

// const change = () => {
//   img.removeAttribute("src"); // removing the image source
//   createImg();
// };

// button.addEventListener("click", change);

async function reload() {
    const response = await fetch(url);
    const data = await response.json();
    img.src = data[0].url;
}

reload();
