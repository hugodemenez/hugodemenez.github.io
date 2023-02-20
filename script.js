const carouselContainer =  document.getElementById("carouselContainer");


console.log(carouselContainer.scrollLeft)
console.log(carouselContainer.scrollWidth - carouselContainer.clientWidth)

window.addEventListener('load', () => {
    self.setInterval(() => {
    if (carouselContainer.scrollLeft < carouselContainer.scrollWidth - carouselContainer.clientWidth) {
        carouselContainer.scrollTo(carouselContainer.scrollLeft + 1, 0);
    }
    else{
        carouselContainer.scrollTo(0, 0);
    }
    }, 20);
}
);



const content = document.getElementById("content");

document.addEventListener('scroll', (event) => {
    let scrolled = 
    document.documentElement.scrollTop / (
        document.documentElement.scrollHeight - document.documentElement.clientHeight
    )
    
    let index = Math.round((content.children.length-1)*scrolled,0)
    if(index-1>=0){
        content.children[index-1].style.color = "lightgray"
    }
    if(index+1<=content.children.length-1){
        content.children[index+1].style.color = "lightgray"
    }
    content.children[index].style.color = "black"
    
})