function showSection(id) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

showSection("home");

// Theme toggle
document.getElementById("themeToggle").onclick = () =>
    document.body.classList.toggle("dark");

/* FOOTER ANIMATION ON SCROLL */
const footer = document.getElementById("footer");

window.addEventListener("load", () => {
    setTimeout(() => footer.classList.add("show"), 400);
});

/* TIMEZONE */
setInterval(() => {
    document.getElementById("timezone").innerText =
        "IST • " + new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
}, 1000);

/* BACK TO TOP */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};


// Show only selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// Show HOME by default on first load
document.addEventListener("DOMContentLoaded", () => {
    showSection("home");
});


function showSection(id) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

showSection("home");

// Theme toggle
document.getElementById("themeToggle").onclick = () =>
    document.body.classList.toggle("dark");

// Timezone
setInterval(() => {
    document.getElementById("timezone").innerText =
        "Indian Standard Time: " +
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}, 1000);




function sendMail(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    if (!name || !email || !message) {
        formMessage.textContent = "❌ Please fill in all fields.";
        formMessage.style.color = "red";
        return;
    }

    const params = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send("service_b67rt3f", "template_yi5n6w3", params)
        .then(() => {
            formMessage.textContent = "✅ Message sent successfully!";
            formMessage.style.color = "green";
            document.querySelector(".contact-form").reset();
        })
        .catch((error) => {
            console.error("EmailJS error:", error);
            formMessage.textContent = "❌ Failed to send message.";
            formMessage.style.color = "red";
        });
}
