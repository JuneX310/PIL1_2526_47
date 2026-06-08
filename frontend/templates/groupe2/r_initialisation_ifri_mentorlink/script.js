const form = document.getElementById("forgotForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert(
        "Un lien de réinitialisation a été envoyé à votre adresse email."
    );

});