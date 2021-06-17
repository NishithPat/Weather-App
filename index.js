let form = document.getElementsByTagName("form")[0];
let idForWeather = "insert_openweather_api";
let idForGiphy = "insert_giphy_api";

async function appendUI(url, unit) {
    let tempScale = "";

    if (unit === "metric") {
        tempScale = "℃";
    } else {
        tempScale = "℉";
    }

    const response = await fetch(url);
    const responseData = await response.json();
    //console.log(responseData); 

    let card = document.createElement("div");
    card.classList.add("card");

    let ul = document.createElement("ul");
    ul.classList.add("list-group");
    ul.classList.add("list-group-flush");

    let li1 = document.createElement("li");
    li1.append("City: ");
    li1.append(responseData.name);
    li1.classList.add("list-group-item");

    let li2 = document.createElement("li");
    li2.append("Temp: ");
    li2.append(responseData.main.temp + " " + tempScale);
    li2.classList.add("list-group-item");
 
    let li3 = document.createElement("li");
    li3.append("Humidity: ");
    li3.append(responseData.main.humidity + "%"); 
    li3.classList.add("list-group-item");  
    
    let li4 = document.createElement("li");
    li4.append("Description: ");
    li4.append(responseData.weather[0].description); 
    li4.classList.add("list-group-item");

    await addGIF(responseData.weather[0].main, card);
    //debugger;

    ul.append(li1, li2, li3, li4);
    setTimeout(() => {

        card.prepend(ul);

        let header = document.createElement("div");
        header.append("Weather details: ");
        header.classList.add("card-header");

        card.prepend(header);
    }, 1000);  

    card.classList.add("mb-4");

    let col = document.createElement("div");
    col.classList.add("col-sm-6");
    col.append(card);

    document.getElementById("data").prepend(col);
    
}

async function addGIF(main, card) {
    let url = `https://api.giphy.com/v1/gifs/translate?api_key=${idForGiphy}&s=${main}&weirdness=${10}`;
    let respond = await fetch(url);
    let respondData = await respond.json();
    //debugger;
    let image = document.createElement("img");
    console.log(respondData.data.images);
    image.src = respondData.data.images.fixed_height.url;
    console.log(respondData.data.images.fixed_height.url);

    card.prepend(image);
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let city = form.elements.city.value;
    let unit = form.elements.temp.value;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${idForWeather}`;

    await appendUI(url, unit);

    form.elements.city.value = "";
    form.elements.temp.value = "";
})