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


function showNumberField(){
    console.log("Show number")
    const input = document.getElementById("number")
    if (!input.className.includes("open_animation")){
        input.className = input.className + " open_animation";
        console.log("animate !!")
    }
}