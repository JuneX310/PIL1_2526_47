document.addEventListener('DOMContentLoaded', () => {
    const steps = ['step-1', 'step-2', 'step-3'];
    let currentStep = 0;

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressBar = document.getElementById('progress-bar');
    const stepLabel = document.getElementById('step-label');
    const progressPercent = document.getElementById('progress-percent');

    // Listes de compétences gérées par MatierePicker
    const strengths = [];
    const weaknesses = [];

    // ── Navigation entre étapes ───────────────────────────────────────────────
    function updateUI() {
        steps.forEach((stepId, index) => {
            const element = document.getElementById(stepId);
            if (element) {
                if (index === currentStep) {
                    element.classList.remove('hidden-step');
                    element.classList.add('active-step');
                } else {
                    element.classList.add('hidden-step');
                    element.classList.remove('active-step');
                }
            }
        });

        // Update Progress
        const progress = ((currentStep + 1) / steps.length) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (stepLabel) stepLabel.textContent = `Étape ${currentStep + 1} sur 3`;
        if (progressPercent) progressPercent.textContent = `${Math.round(progress)}%`;

        // Update Buttons
        if (prevBtn) {
            if (currentStep === 0) {
                prevBtn.classList.add('invisible');
            } else {
                prevBtn.classList.remove('invisible');
            }
        }

        if (nextBtn && submitBtn) {
            if (currentStep === steps.length - 1) {
                nextBtn.classList.add('hidden');
                submitBtn.classList.remove('hidden');
            } else {
                nextBtn.classList.remove('hidden');
                submitBtn.classList.add('hidden');
            }
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentStepEl = document.getElementById(steps[currentStep]);
            const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    isValid = false;
                }
            });

            if (isValid && currentStep < steps.length - 1) {
                currentStep++;
                updateUI();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateUI();
            }
        });
    }

    // ── MatierePicker : Points forts ──────────────────────────────────────────
    function renderStrengthTags() {
        const container = document.getElementById('insc-strength-tags');
        if (!container) return;
        container.innerHTML = '';
        strengths.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'flex items-center gap-xs px-sm py-1.5 rounded-full bg-succes/15 text-succes font-bouton text-[12px] border border-succes/30';
            tag.innerHTML = `${skill} <button class="material-symbols-outlined text-[13px] cursor-pointer hover:text-erreur" type="button">close</button>`;
            tag.querySelector('button').addEventListener('click', () => {
                const idx = strengths.indexOf(skill);
                if (idx > -1) strengths.splice(idx, 1);
                renderStrengthTags();
                updateStrengthLabel();
            });
            container.appendChild(tag);
        });
    }

    function updateStrengthLabel() {
        const label = document.getElementById('insc-strength-label');
        if (label) {
            label.textContent = strengths.length === 0
                ? 'Choisir mes points forts'
                : `${strengths.length} matière${strengths.length > 1 ? 's' : ''} sélectionnée${strengths.length > 1 ? 's' : ''}`;
        }
    }

    const strengthBtn = document.getElementById('insc-strength-btn');
    if (strengthBtn && window.MatierePicker) {
        new window.MatierePicker({
            triggerEl:    strengthBtn,
            selectedList: strengths,
            accentColor:  'strength',
            onChange: () => {
                renderStrengthTags();
                updateStrengthLabel();
            }
        });
    }

    // ── MatierePicker : Points faibles ────────────────────────────────────────
    function renderWeaknessTags() {
        const container = document.getElementById('insc-weakness-tags');
        if (!container) return;
        container.innerHTML = '';
        weaknesses.forEach(subject => {
            const tag = document.createElement('span');
            tag.className = 'flex items-center gap-xs px-sm py-1.5 rounded-full bg-secondary/10 text-secondary font-bouton text-[12px] border border-secondary/30';
            tag.innerHTML = `${subject} <button class="material-symbols-outlined text-[13px] cursor-pointer hover:text-erreur" type="button">close</button>`;
            tag.querySelector('button').addEventListener('click', () => {
                const idx = weaknesses.indexOf(subject);
                if (idx > -1) weaknesses.splice(idx, 1);
                renderWeaknessTags();
                updateWeaknessLabel();
            });
            container.appendChild(tag);
        });
    }

    function updateWeaknessLabel() {
        const label = document.getElementById('insc-weakness-label');
        if (label) {
            label.textContent = weaknesses.length === 0
                ? 'Choisir mes besoins'
                : `${weaknesses.length} matière${weaknesses.length > 1 ? 's' : ''} sélectionnée${weaknesses.length > 1 ? 's' : ''}`;
        }
    }

    const weaknessBtn = document.getElementById('insc-weakness-btn');
    if (weaknessBtn && window.MatierePicker) {
        new window.MatierePicker({
            triggerEl:    weaknessBtn,
            selectedList: weaknesses,
            accentColor:  'weakness',
            onChange: () => {
                renderWeaknessTags();
                updateWeaknessLabel();
            }
        });
    }

    // ── Soumission du formulaire ──────────────────────────────────────────────
    const form = document.getElementById('registration-form');
    if (form) {
        form.addEventListener('submit', () => {
            // Sérialiser les listes de compétences dans les champs cachés
            document.getElementById('hidden_points_forts').value = JSON.stringify(strengths);
            document.getElementById('hidden_points_faibles').value = JSON.stringify(weaknesses);

            // Collecter les disponibilités depuis la grille de cases
            const disponibilites = [];
            const rows = document.querySelectorAll('tbody tr');
            const days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];

            rows.forEach(row => {
                const firstCell = row.querySelector('td:first-child');
                if (!firstCell) return;
                const timeStr = firstCell.textContent.trim();
                const checkboxes = row.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach((cb, index) => {
                    if (cb.checked && days[index]) {
                        disponibilites.push(`${days[index]} ${timeStr}`);
                    }
                });
            });
            document.getElementById('hidden_disponibilites').value = JSON.stringify(disponibilites);
            // Le formulaire se soumet normalement
        });
    }
});
