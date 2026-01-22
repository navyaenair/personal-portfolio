
/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTS ================= */
    const sections = document.querySelectorAll(".section");
    const footer = document.getElementById("footer");
    const sidebar = document.getElementById("sidebar");
    const themeToggle = document.getElementById("themeToggle");
    const backToTop = document.getElementById("backToTop");
    const timezoneEl = document.getElementById("timezone");
    const toggleBtn = document.getElementById("menuToggle");

    /* ================= SECTION SWITCHING ================= */
    window.showSection = function (sectionId) {

        // Hide all sections
        sections.forEach(sec => sec.classList.remove("active"));

        // Show selected section
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.add("active");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // Footer ONLY on home
        if (sectionId === "home") {
            footer.classList.add("show");
        } else {
            footer.classList.remove("show");
        }

        // Auto-close sidebar on mobile AFTER clicking menu
        if (window.innerWidth <= 767) {
            sidebar.classList.remove("active");
        }
    };

    /* Load HOME by default */
    showSection("home");

    /* ================= DARK / LIGHT MODE ================= */
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        themeToggle.textContent = isDark ? "☀️" : "🌙";
    });

    /* ================= TIMEZONE ================= */
    setInterval(() => {
        timezoneEl.textContent =
            "IST • " +
            new Date().toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
    }, 1000);

    /* ================= BACK TO TOP ================= */
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ================= MOBILE SIDEBAR ================= */
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });

    document.querySelectorAll(".sidebar button").forEach(btn => {
        btn.addEventListener("click", () => {
            sidebar.classList.remove("active");
        });
    });
});

/* ================= EMAILJS CONTACT FORM ================= */
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

    /* 1️⃣ Send message to YOU */
    emailjs.send("service_b67rt3f", "template_yi5n6w3", params)

    /* 2️⃣ Auto-reply to USER */
    .then(() => {
        return emailjs.send(
            "service_b67rt3f",
            "template_h24lykb", // 👈 create this template
            params
        );
    })

    .then(() => {
        formMessage.textContent = "✅ Message sent! Check your email 📩";
        formMessage.style.color = "lime";
        document.querySelector(".contact-form").reset();
    })

    .catch(err => {
        console.error("EmailJS Error:", err);
        formMessage.textContent = "❌ Failed to send message.";
        formMessage.style.color = "red";
    });
}
