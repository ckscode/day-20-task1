//selecting elements
const searchInput = document.querySelector(".input");
const searchButton = document.querySelector(".btn");
const Output = document.querySelector(".output");
const Typetext = document.querySelector(".typetext");

searchInput.addEventListener("keypress",(e)=>{
  if(e.value !== ""){
    Typetext.innerHTML="&nbsp;";
  }
})
//function to display image
const imagesDisplay = () => {
  //setting the variable for the URL
  const item = searchInput.value;
  const Url = `https://pixabay.com/api/?key=26333275-5f0eec97f1c6b1846a9da2e5e&q=${item}&image_type=photo`;

  //fetching data
  fetch(Url)
    .then((response) => response.json())
    .then((e) => {
      const data = e.hits;
      Output.innerHTML = "";

      // if invalid input is given by the user
      if(data.length === 0){
       return Typetext.textContent="type a valid input"
      }
      // mapping the data and rendering to UI
      data.map((ele, index) => {
        return (Output.innerHTML += `<div  id=${index} class="w-100 pictures" onmouseover="displayId(this)" onmouseout="displayOut(this)">
        <img class="w-100" src="${ele.largeImageURL}" alt="images"/>
        <div  class="black d-none">
        <span class="views" title="views"><i class="fa-solid fa-eye"></i>${ele.views}</span>
        <span class="preview" title="views"><a href="${ele.pageURL}" target="_blank">preview</a></span> 
        <div class="d-flex align-items-center user-content">
        <img  class="user" src="${ele.userImageURL}" alt="./assets/user.jpg" />
        <div >
        <h6 class="text-light ms-2 mb-0 username">${ele.user}</h6>
        <p class="text-light ms-2 mb-0 likes">${ele.likes} Likes</p>
        </div>
        </div>
        </div>
        </div>`);
      });
    })
    .catch((err) => console.log(err));
};

// function for hover
const displayId = (e) => {
  const Card = document.querySelectorAll(".pictures");
  const Fade = document.querySelectorAll(".black");
  Card[e.id].classList.toggle("selected");
  Fade[e.id].classList.toggle("d-none");
};

// function for hoverout
const displayOut = (e) => {
  const Card = document.querySelectorAll(".pictures");
  const Fade = document.querySelectorAll(".black");
  Card[e.id].classList.remove("selected");
  Fade[e.id].classList.toggle("d-none");
};
searchButton.addEventListener("click", () => {
  if(searchInput.value === ""){
    return Typetext.textContent="type a valid input"
 }else{
  Typetext.innerHTML="&nbsp;";
  imagesDisplay()
  }
}
);
searchInput.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){
      if(searchInput.value === ""){
        return Typetext.textContent="type a valid input"
     }else{
      Typetext.innerHTML="&nbsp;";
      imagesDisplay()}
      
     }
  
 
})
