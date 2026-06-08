const levelButtons = document.querySelectorAll(".level-btn");

levelButtons.forEach(button => {
    button.addEventListener("click", () => {

        levelButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");
    });
});

document
.getElementById("registerForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Passage à l'étape suivante !");
});