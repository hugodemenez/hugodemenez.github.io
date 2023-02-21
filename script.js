// Auto Scrolling Caroussel
const carouselContainer = document.getElementById("carouselContainer")

window.addEventListener('load', () => {
    self.setInterval(() => {
    if (carouselContainer.scrollLeft !== carouselContainer.scrollWidth - carouselContainer.clientWidth) {
        carouselContainer.scrollTo(carouselContainer.scrollLeft + carouselContainer.clientWidth, 0);
    }
    }, 6000);
});


// Font Highlight onScroll
const content = document.getElementById("content");
document.addEventListener('scroll', (event) => {
    let scrolled = 
    document.documentElement.scrollTop / (
        document.documentElement.scrollHeight - document.documentElement.clientHeight
    )
    
    let index = Math.round((content.children.length-1)*scrolled,0)
    if(index-1>=0 
        && content.children[index-1].className!=="cta"
        && content.children[index-1].className!=="title"
        ){
        content.children[index-1].style.color = "lightgray"
    }
    if(index+1<=content.children.length-1 
        && content.children[index+1].className!=="cta"
        && content.children[index+1].className!=="title"
        ){
        content.children[index+1].style.color = "lightgray"
    }
    if(
        content.children[index].className!=="cta" 
        && content.children[index].className!=="title"
        ){
        content.children[index].style.color = "black"
    }
})



// Number field animation
function showNumberField(){
    console.log("Show number")
    const input = document.getElementById("number")
    if (!input.className.includes("open_animation")){
        input.className = input.className + " open_animation";
        console.log("animate !!")
    }
}

//Image hover effect
const project1 = document.getElementById("project1")
project1.addEventListener("mouseenter",(event) => {
    console.log("GOT IT")
    event.target.src = "./hover_image.png"
    // reset the color after a short delay
    setTimeout(() => {
        event.target.src = "./image.png"
    }, 500);
}, false);
