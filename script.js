// Auto Scrolling Caroussel
const carouselContainer = document.getElementById("carouselContainer");
const image = carouselContainer.getElementsByTagName("img")[0]

window.addEventListener('load', 
    () => {
        self.setInterval(
            () => {
                const scrollableWidth = carouselContainer.scrollWidth - carouselContainer.clientWidth;
                if (carouselContainer.scrollLeft < scrollableWidth) {
                    // Scroll to next picture
                    carouselContainer.scroll(
                        {
                            top:0,
                            left:carouselContainer.scrollLeft+image.width,
                            behavior:"smooth"
                        }
                    );
                }
                else{
                    // Restart scroll to start
                    carouselContainer.scrollTo(0, 0);
                }
            },3000
        );
    }
);


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
        child.style.color = "rgb(var(--text))";
    }
    readingHighlight.children[index].style.color = "rgb(var(--accent))"

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


// Chat

// Definning elements
const discussion = document.querySelector(".discussion");
const sendButton = document.querySelector(".send-btn");

const textarea = document.querySelector('.text-input');
// Create a controller to abort the request if needed
const controller = new AbortController();
const signal = controller.signal;

// Auto resize
textarea
    .addEventListener('input', function() {
        this.style.height = "auto"; // This is to reset height
        this.style.height = Math.min(this.scrollHeight, 240) + 'px';
    }
);
textarea.addEventListener('keypress', function(event) {
    const button = document.querySelector(".send-btn");
    if (event.code === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        button.click();
    }
}
);





function sendMessage(){
    console.log("Sending a request to GPT model.");

    // Create a history of messages
    const messagesHistory = [];

    // Set the model behavior
    messagesHistory.push(
        {
            'role': 'system',
            'content': `
            Tu es un expert dans la gestion de patrimoine.
            Tu vas répondre aux questions des clients.
            Tes réponses vont être affichées sur un site internet.
            Fais des passages à la ligne afin d'offrir une réponse clair et aérée.
            N'hésite pas à faire des bullet points dans tes réponses.
            `
        }
    );



    // Retrieve all the previous conversation and identify the role of each message
    for (const conversationElement of discussion.getElementsByTagName("div")){
        var role = String();
        if (conversationElement.className == "question"){
            role = 'user'
        } else {
            role =  'assistant'
        }
        messagesHistory.push(
            {
                'role': role,
                'content':conversationElement.innerText
            }
        );
    }
    
    // Add the new message to the history
    messagesHistory.push(
        {
            'role': 'user',
            'content': textarea.value
        }
    );

    // Transform the button into a stop button
    sendButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9999 12.9999L7 7.00001M7.00013 12.9999L13 7.00001M19 10C19 14.9706 14.9706 19 10 19H1V10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke-linecap="round"/>
    </svg>
    `;

    // Remove the send message applied to button
    sendButton.removeEventListener("click", sendMessage);

    // Add the stop message applied to button
    sendButton.addEventListener("click", stopMessage);

    // Disable the textarea
    textarea.disabled = true;

    // Put the message in the discussion field
    const question = document.createElement("div");
    question.className = "question";
    question.innerHTML = `<p>${textarea.value}</p>`;
    discussion.append(question);

    // Put the answer in the discussion field with loader
    const answer = document.createElement("div");
    answer.className = "answer";
    answer.innerHTML = `<div class="loader"></div>`;
    discussion.append(answer);


    // Send the request to the GPT model
    fetch(
        new Request("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENAI_API_KEY.replaceAll("_","b")}`
                },
                body: JSON.stringify({
                    'model': 'gpt-3.5-turbo',
                    'max_tokens': 150,
                    'messages': messagesHistory,
                    'temperature': 0.7
                })
            }
        ),
        {
            signal // Stoping the request if needed
        }
    ).then(
        response => {
        if (response.ok){
            response.json().then(data => {
                console.log(data);
                textarea.value = ""; // Clear textarea
                // Remove the stop message applied to button
                sendButton.removeEventListener("click", stopMessage);

                // Transform the button into a send button
                sendButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10V19H10Z" />
                </svg>
                `;

                // enable the textarea
                textarea.disabled = false;

                // Add the send message applied to button
                sendButton.addEventListener("click", sendMessage);
                // Remove the loading animation
                answer.innerHTML = ``;
                const answerContent = document.createElement("p");
                answer.append(answerContent);
                var delay = 0;
                data.choices[0].message.content
                .replace(/\n/g,"<br>")
                .replace(/`([^`]*)`/g, "<code>$1</code>")
                .split(" ").forEach(
                    word =>{
                        // Display the content with typing effect
                        const randomTimeout = Math.random()*(100-25)+25;
                        setTimeout(()=>{
                            answerContent.innerHTML += word+" ";
                        },delay)
                        delay += randomTimeout;
                    }
                );
            });
        }
        else {
            console.log("error",response)
        } 
    });
}

function stopMessage(){
    controller.abort();
}

sendButton.addEventListener("click", sendMessage);


window.addEventListener('load', 
    () => {
        textarea.style.height = Math.min(textarea.scrollHeight, 240) + 'px';
    }
);


text = `Pas de problème, je peux vous aider à remplir votre déclaration d'impôt. Voici quelques conseils pour vous guider dans cette démarche :

1. Rassemblez tous les documents nécessaires : avant de commencer la déclaration, assurez-vous d'avoir tous les documents nécessaires à portée de main, tels que votre avis d'imposition de l'année dernière, vos relevés de comptes bancaires et d'investissement, ainsi que tous les justificatifs de dépenses déductibles.

2. Identifiez les revenus à déclarer : vous devez déclarer tous les revenus perçus au cours de l'année fiscale, y compris les salaires, les revenus fonciers, les rentes, les revenus de capitaux mobiliers, etc.

3. Identifiez les dépenses déductibles : vous pouvez déduire certaines dépenses de vos revenus imposables, telles que les frais de garde d'enfants, les dons aux associations, les frais de santé, etc.

4. Utilisez les bons formulaires : il existe différents formulaires pour déclarer vos revenus en fonction de votre situation fiscale, tels que le formulaire 2042 pour les revenus courants, le formulaire 2044 pour les revenus fonciers, etc.

5. Vérifiez et validez votre déclaration : une fois que vous avez rempli tous les formulaires, vérifiez bien que toutes les informations sont correctes avant de valider votre déclaration.

Si vous avez des doutes ou des questions spécifiques concernant votre déclaration d'impôt, n'hésitez pas à contacter un expert-comptable ou un conseiller en gestion de patrimoine pour obtenir de l'aide et des conseils personnalisés.`