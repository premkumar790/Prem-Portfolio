// ==================== Typing Effect ====================
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

// ==================== Contact Form Submit ====================

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const nameValue = document.getElementById("name").value;
    const emailValue = document.getElementById("email").value;
    const messageValue = document.getElementById("message").value;

    fetch("https://prem-portfolio-rkl5.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            email,
            message
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Message Sent Successfully!");
                e.target.reset();
            } else {
                alert("Failed: " + data.message);
            }
        })
        .catch(err => {
            console.error(err);
            alert("Something went wrong while sending the message!");
        });
});