document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const notification = document.getElementById("form-notification");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      notification.textContent = "⚠️ Please fill the form before sending.";
      notification.className = "mt-4 text-lg font-semibold text-red-400";
      return;
    }

    // Success
    notification.textContent = "✅ Message sent successfully!";
    notification.className = "mt-4 text-lg font-semibold text-green-400";

    // Optional: backend ko bhejna
    
    fetch("http://localhost:5000/contact/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Form submitted successfully!") {
          notification.textContent = "✅ Your message has been sent!";
          notification.className = "mt-4 text-lg font-semibold text-green-400";
        } else {
          notification.textContent = "❌ There was an error!";
          notification.className = "mt-4 text-lg font-semibold text-red-400";
        }
      })
      .catch((err) => console.error("Error:", err));
    
  });
});
