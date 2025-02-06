document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem("registered")) {
        document.getElementById("registerModal").style.display = "flex";
    }
});

function registerUser() {
    localStorage.setItem("registered", "true");
    alert("Thank you for registering!");
    closeModal();
}

function closeModal() {
    document.getElementById("registerModal").style.display = "none";
}
