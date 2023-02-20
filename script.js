const content = document.getElementById("content");

document.addEventListener('scroll', (event) => {
    let scrolled = 
    document.documentElement.scrollTop / (
        document.documentElement.scrollHeight - document.documentElement.clientHeight
    )
    
    let index = Math.round((content.children.length-1)*scrolled,0)
    if(index-1>=0 && content.children[index-1].className!=="cta"){
        content.children[index-1].style.color = "lightgray"
    }
    if(index+1<=content.children.length-1 && content.children[index+1].className!=="cta"){
        content.children[index+1].style.color = "lightgray"
    }
    if(content.children[index].className!=="cta"){
        content.children[index].style.color = "black"
    }
})