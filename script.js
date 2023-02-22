// Auto Scrolling Caroussel
const carouselContainer = document.getElementById("carouselContainer")

window.addEventListener('load', () => {
    self.setInterval(() => {
    if (carouselContainer.scrollLeft !== carouselContainer.scrollWidth - carouselContainer.clientWidth) {
        // Scroll to next picture
        carouselContainer.scrollTo(carouselContainer.scrollLeft + carouselContainer.clientWidth, 0);
    }
    else{
        // Restart scroll to start
        carouselContainer.scrollTo(0, 0);
    }
    }, 3000);
});


// Font Highlight onScroll
const readingHighlight = document.getElementById("readingHighlight");


document.addEventListener('scroll', (event) => {
    let scrolled = 
    document.documentElement.scrollTop / (
        document.documentElement.scrollHeight - document.documentElement.clientHeight
    )
    let index = Math.round((readingHighlight.children.length-1)*scrolled,0)
    for (const child of readingHighlight.children){
        if (
            child.className!=="cta"
            && child.className!=="title"
        )
        child.style.color = "lightgray";
    }
    readingHighlight.children[index].style.color = "black"

})



// Number field animation
function showNumberField(){
    const input = document.getElementById("number")
    if (!input.className.includes("open_animation")){
        input.className = input.className + " open_animation";
    }
}

//Image hover effect
const project1 = document.getElementById("project1")
project1.addEventListener("mouseenter",(event) => {
    event.target.src = "./hover_image.png"
    // reset the color after a short delay
    setTimeout(() => {
        event.target.src = "./image.png"
    }, 500);
}, false);
