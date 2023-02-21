const cityForm=document.querySelector('form');
const card=document.querySelector('.card');
const details=document.querySelector('.details');
const time=document.querySelector('img.time');
const  icon=document.querySelector('.icon img');

const updateUI=(data)=>{
    // const cityDets=data.cityDets;
    // const weather=data.weather;

    //destructure properties
    const{cityDets,weather}=data;

    //update details template
    details.innerHTML=`
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;
   
    //update icon
    const iconScr=`img/icons/${weather.WeatherIcon}.svg`;
    // console.log(iconScr);
    icon.setAttribute('src',iconScr);


    //update day and night image
    let timeSrc=null;
    if(weather.IsDayTime) {
        timeSrc='img/day.svg';
    }else{
        timeSrc='img/night.svg';
    }  
    // console.log( timeSrc);
    time.setAttribute('src',timeSrc);


    //removing the class d-none
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity= async(city)=>{
    const cityDets=await getCity(city);
    const weather=await getWeather(cityDets.Key);

    return{
        cityDets ,          // cityDets:cityDets,
        weather                //weather:weather
    };
};


cityForm.addEventListener('submit',e=>{
    //prevent Default action
    e.preventDefault();

    //get city value
    const city=cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
    .then(data=>updateUI(data))
    // .then(data=>console.log(data))
    .catch(err=>console.log(err));
});