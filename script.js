var typed = new Typed(".text",{
    strings:["fronted developer","backend developer", "web developer",],
    typeSpeed: 10,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});



// function startVoice(){
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// recognition.lang = "en-US";
// recognition.continous=true;
// recognition.interimResults = false;

// recognition.start();

// recognition.onresult = function(event){

// let command = event.results[0][0].transcript.toLowerCase();

// console.log(command);

// if(command.includes("home")){
// document.getElementById("home").scrollIntoView({behavior:"smooth"});
// }

// else if(command.includes("about")){
// document.getElementById("about").scrollIntoView({behavior:"smooth"});
// }

// else if(command.includes("skills")){
// document.getElementById("skills").scrollIntoView({behavior:"smooth"});
// }

// else if(command.includes("projects")){
// document.getElementById("projects").scrollIntoView({behavior:"smooth"});
// }

// else if(command.includes("contact")){
// document.getElementById("contact").scrollIntoView({behavior:"smooth"});
// }

// };

// }
// ==================== Typing Animation ====================
var typed = new Typed(".text", {
    strings: ["fronted developer", "backend developer", "web developer"],
    typeSpeed: 10,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// ==================== Voice Command ====================
let recognition;

function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.start();
    console.log("Voice assistant started");

    recognition.onresult = function (event) {
        let command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log("You said:", command);

        if (command.includes("home")) {
            document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
        } else if (command.includes("about")) {
            document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
        } else if (command.includes("skill")) {
            document.querySelector("#skills").scrollIntoView({ behavior: "smooth" });
        } else if (command.includes("project")) {
            document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
        } else if (command.includes("contact")) {
            document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
        }
    };

    recognition.onerror = function (error) {
        console.log("Voice error:", error);
    };
}

// ==================== Contact Form Submit (Email Sender) ====================

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value
    };

    fetch("https://prem-portfolio-rkl5.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then((res) => res.json())
        .then((data) => {
            alert("Message sent successfully!");
            e.target.reset();
        })
        .catch((err) => {
            console.error(err);
            alert("Something went wrong while sending the message!");
        });
});