const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=2&api_key=37319f20-acfe-4034-8677-4996b1321da4";
const API_URL_FAVOTITES =
  "https://api.thecatapi.com/v1/favourites?api_key=37319f20-acfe-4034-8677-4996b1321da4";
const API_URL_FAVOTITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=37319f20-acfe-4034-8677-4996b1321da4`;

const spanError = document.getElementById("error");

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("Random");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
    loadFavouriteMichis();
  }
}

async function loadFavouriteMichis() {
  const section = document.getElementById("favoriteMichis");
  const res = await fetch(API_URL_FAVOTITES);
  const data = await res.json();
  console.log("Favoritos");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    section.innerHTML = " ";
    const h2 = document.createElement("h2");
    h2.innerHTML = "Favoritos";
    section.appendChild(h2);

    data.forEach((michi) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Sacar al michi de favoritos");

      img.src = michi.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json();

  console.log("Save");
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Guardado");
    
    loadFavouriteMichis();
  }
  
}

async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
    method: "DELETE",
  });
  const data = await res.json();
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Borrado");
    loadFavouriteMichis();
  }
}

loadRandomMichis();
loadFavouriteMichis();
