(function () {
  const form = document.getElementById("connexion-form");
  const identifiant = document.getElementById("identifiant");
  const password = document.getElementById("password");
  const errorBox = document.getElementById("form-error");
  const submitBtn = form?.querySelector(".btn-submit");

  if (!form || !identifiant || !password || !errorBox) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+?\d{1,3})?[\s.-]?\d{8,15}$/;

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  function clearError() {
    errorBox.textContent = "";
    errorBox.hidden = true;
  }

  function setInvalid(input, invalid) {
    input.classList.toggle("invalid", invalid);
  }

  function isValidIdentifiant(value) {
    const trimmed = value.trim();
    if (!trimmed) return false;
    return emailRegex.test(trimmed) || phoneRegex.test(trimmed.replace(/\s/g, ""));
  }

  function validate() {
    clearError();
    let valid = true;

    const idValue = identifiant.value.trim();
    const pwdValue = password.value;

    if (!idValue) {
      setInvalid(identifiant, true);
      showError("Indique ton email ou ton numéro de téléphone.");
      valid = false;
    } else if (!isValidIdentifiant(idValue)) {
      setInvalid(identifiant, true);
      showError("Email ou numéro de téléphone invalide.");
      valid = false;
    } else {
      setInvalid(identifiant, false);
    }

    if (!pwdValue) {
      setInvalid(password, true);
      if (valid) showError("Indique ton mot de passe.");
      valid = false;
    } else if (pwdValue.length < 6) {
      setInvalid(password, true);
      if (valid) showError("Le mot de passe doit contenir au moins 6 caractères.");
      valid = false;
    } else {
      setInvalid(password, false);
    }

    return valid;
  }

  identifiant.addEventListener("input", () => {
    setInvalid(identifiant, false);
    if (!errorBox.hidden) clearError();
  });

  password.addEventListener("input", () => {
    setInvalid(password, false);
    if (!errorBox.hidden) clearError();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;

    if (submitBtn) submitBtn.disabled = true;

    // À brancher sur votre API PHP / backend
    console.log("Connexion:", {
      identifiant: identifiant.value.trim(),
    });

    if (submitBtn) submitBtn.disabled = false;
  });
})();
