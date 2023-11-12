const cityName = document.querySelector(".city-name");
const temperature  = document.querySelector(".temperature");
const visibile = document.querySelector(".visibility");
const desc = document.querySelector(".desc");
const image = document.querySelector(".img");
const hum = document.querySelector(".humidity");
const press = document.querySelector(".pressure");
const apiKey = "0a4f52c8c739aeeb4a22100042038eec";
const searchBar = document.querySelector("i");
const input = document.querySelector("input");
const screen = document.querySelector(".screen");
const spinner = document.querySelector(".spinner");
const emptyTrash = document.querySelector(".empty-trash");
const cards = document.querySelector(".cards");
const text = document.querySelector(".text");
const obj = {
    fetchData : async function(city){
        try{
            const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            const objData = await promise.json();
            if(promise.ok){
                const {name , visibility} = objData;
                const {humidity , pressure , temp} = objData.main;
                const {description , icon} = objData.weather[0];
                this.getData({name , visibility , description , humidity , pressure , temp , icon});
                
            }else{
                alert(`${city} is not present in our database .....`);
                spinner.style.display="none";
                emptyTrash.style.display="block";
                text.style.display = "none";
            }
            
            
        }catch(e){
            console.log(e);
        }
    },
    getData : ({name , description , visibility , humidity , temp , pressure , icon})=>{
        
        // console.log(image);
        cityName.textContent = name;
        visibile.textContent = visibility;
        temperature.textContent = temp;
        hum.textContent = humidity;
        press.textContent = pressure;
        desc.textContent = description;
        image.src = `https://openweathermap.org/img/w/${icon}.png`;
        text.style.display = "block";
        spinner.style.display="none";
    }
}

searchBar.addEventListener("click" , ()=>{
    const city = input.value;
    if(city){
        obj.fetchData(city);
        input.value="";
        emptyTrash.style.display = "none";
        spinner.style.display="block";
        text.style.display="none";
    }else{
        alert("Kindly enter the city name first ....")
    }
})
// text.style.display="block";


