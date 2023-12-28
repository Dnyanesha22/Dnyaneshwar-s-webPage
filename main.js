const weatherAPIKey='e59ef367894e3458b5ab4de74db9fdab';
const weatherAPIURL=`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

const products=[
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./img4.png"
    }
  ]

const galleryImages=[
    {src:"./image2.jpg", alt:"Thumbnail Image 2" },
    {src:"./image1.jpg", alt:"Thumbnail Image 1" }
    ,{src:"./image3.jpg", alt:"Thumbnail Image 3" }
    ,{src:"./img1.png", alt:"Thumbnail Image 4" }
]

//menuHandler
function menuHandler(){
    document.querySelector('#open-nav-menu').addEventListener('click',function()
    {document.querySelector('header nav .wrapper').classList.add('nav-open')});
    
    document.querySelector('#close-nav-menu').addEventListener('click',function()
    {document.querySelector('header nav .wrapper').classList.remove('nav-open')});
}

//temperatur conversion section
function celciusToFahr(temperatur){
    let fahr= (temperatur*9/5)+32
    return fahr;
}
//greetingHandler

function greetingHandler(){

    let currentHour=new Date().getHours();
    let greetingText;
    if (currentHour<12){
        greetingText="Good Morning!"
    }else if (currentHour<19){
        greetingText="Good Afternoon!"
    }else if (currentHour< 24){
        greetingText="Good Evening!"
    }else {
        greetingText="Welcome!"
    }
    document.querySelector("#greeting").innerHTML=greetingText    
    
    
    

}
//weather handler
function weatherHandler(){
    navigator.geolocation.getCurrentPosition(position =>{
    
        let latitude=position.coords.latitude;//18.47
        let longitude=position.coords.longitude;//76.00 for moha
        let url=weatherAPIURL.replace("{lat}",latitude).replace("{lon}",longitude)
        .replace("{API key}",weatherAPIKey);
        
        fetch(url)
        .then( response => response.json())
        .then( data =>{
       
            
                const condition=data.weather[0].description;
                const location=data.name;
                let temperature=data.main.temp;
            
                let celsiusText=`The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)+ "°C"}`
                let fahrText=`The weather is ${condition} in ${location} and it's ${celciusToFahr(temperature).toFixed(1)+ "°F"}`
                
                
                //temperature conversion
                document.querySelector(".weather-group").addEventListener("click",function(e){
                    if(e.target.id=="celsius"){
                        document.querySelector("p#weather").innerHTML=celsiusText;
                    }
                    else if (e.target.id=="fahr"){
                        document.querySelector("p#weather").innerHTML=fahrText;
                    };  
                })  
            
          
    
        }).catch((err => {
            document.querySelector("p#weather").innerHTML="Unable to get the weather information. Try again later."
        }))

        });
    }
//clockHandler

function clockHandler(){
    let localTime=new Date();
    document.querySelector("span[data-time=hours]").textContent=localTime.getHours();
    document.querySelector("span[data-time=minutes]").textContent=localTime.getMinutes();
    document.querySelector("span[data-time=seconds]").textContent=localTime.getSeconds();
         
    setInterval(function(){
        let localTime=new Date();
    document.querySelector("span[data-time=hours]").textContent=localTime.getHours().toString().padStart(2,"0");
    document.querySelector("span[data-time=minutes]").textContent=localTime.getMinutes().toString().padStart(2,"0");
    document.querySelector("span[data-time=seconds]").textContent=localTime.getSeconds().toString().padStart(2,"0");
    },1000)   
}
 
//galleryHandler
function galleryHandler(){

    
    
    let mainImage = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");
    
    
    galleryImages.forEach(function(image,index){
        let thumb = document.createElement("img");
        thumb.src=image.src;
        thumb.alt=image.alt;
        thumb.dataset.arrayIndex=index;
        thumb.dataset.selected= (index===1)?true:false;
    
        thumb.addEventListener("click", function(e){
           
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = galleryImages[selectedIndex];
            mainImage.src=selectedImage.src;
            mainImage.alt=selectedImage.alt;
    
            thumbnails.querySelectorAll("img").forEach(function(img){
                img.dataset.selected=false;
            });
            e.target.dataset.selected=true;
        });
    
        
        thumbnails.appendChild(thumb);
    });    
}

function populateProduct(productList){

    let productsSection=document.querySelector(".products-area"); 
    //productsSection.textContent = "";

    productList.forEach(function(product,index){
        //create the HTML element for individual product
let productElm=document.createElement("div");
productElm.classList.add("product-item");
//create the productImage
let productImage=document.createElement("img");
productImage.src=product.image;
productImage.alt="Image for "+ product.title;
//create product detail section
let productDetails=document.createElement("div");
productDetails.classList.add("product-details");
//create product titles,author, price title , price
let productTitle=document.createElement("h3");
productTitle.classList.add("product-title");
productTitle.textContent=product.title;

let productAuthor=document.createElement("h3");
productAuthor.classList.add("product-author");
productAuthor.textContent=product.author;

let priceTitle=document.createElement("p");
priceTitle.classList.add("price-title");
priceTitle.textContent="price";

let productPrice=document.createElement("p");
productPrice.classList.add("product-price");
productPrice.textContent=product.price > 0 ? "$"+product.price.toFixed(2):"Free";

//append product details
productDetails.append(productTitle);
productDetails.append(productAuthor);
productDetails.append(priceTitle);
productDetails.append(productPrice);

//add all child HTML elements of the products
productElm.append(productImage);
productElm.append(productDetails);

//add individual products to the product sections
productsSection.append(productElm);
    });
}

//productSection

//run a loop through a products and create HTML elements ("product-item")for each of them
function productsHandler(){
    

    let freeProducts=products.filter(  item  =>  !item.price || item.price<=0)
    

    let paidProducts=products.filter( item =>   item.price> 0)
    
    
    populateProduct(products);

    document.querySelector(".products-filter label[for=all] span.product-amount ").textContent=products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount ").textContent=paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount ").textContent=freeProducts.length;

    let productsFilter = document.querySelector(".products-filter");

    productsFilter.addEventListener("click" ,function(e){
        if (e.target === "all"){
            populateProduct(products);
        } else if (e.target === "paid"){
            populateProduct(paidProducts);
        } else if (e.target === "free"){
            populateProduct(freeProducts);
        }
    });
}

function footerHandler(){
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent=`© ${currentYear}  All Rights Reserved`;
}


//pageLoad
//MenuHandler
menuHandler();
//greetinghandler
greetingHandler();
weatherHandler();
//clockHandler
clockHandler();
//galleryHandler
galleryHandler();
//productsHandler
productsHandler();
footerHandler();

