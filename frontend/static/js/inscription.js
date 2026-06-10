document.addEventListener('DOMContentLoaded', () => {
    const steps = ['step-1', 'step-2', 'step-3'];
    let currentStep = 0;

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressBar = document.getElementById('progress-bar');
    const stepLabel = document.getElementById('step-label');
    const progressPercent = document.getElementById('progress-percent');

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
            // Validate current step before advancing
            const currentStepEl = document.getElementById(steps[currentStep]);
            const inputs = currentStepEl.querySelectorAll('input, select, textarea');
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

    // Skill tag interaction
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const type = tag.dataset.type;
            const isSelected = tag.classList.contains('bg-succes') || tag.classList.contains('bg-secondary');
            
            if (isSelected) {
                tag.classList.remove('bg-succes', 'bg-secondary', 'text-white', 'border-transparent');
                tag.classList.add('bg-surface-container', 'border-outline-variant');
                const span = tag.querySelector('span');
                if (span) span.textContent = 'add';
            } else {
                const colorClass = type === 'strength' ? 'bg-succes' : 'bg-secondary';
                tag.classList.add('text-white', colorClass, 'border-transparent');
                tag.classList.remove('bg-surface-container', 'border-outline-variant');
                const span = tag.querySelector('span');
                if (span) span.textContent = 'check';
            }
        });
    });

    const form = document.getElementById('registration-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            // Collect strengths
            const strengths = Array.from(document.querySelectorAll('.skill-tag[data-type="strength"].bg-succes'))
                                   .map(el => el.textContent.replace('check', '').trim());
            document.getElementById('hidden_points_forts').value = JSON.stringify(strengths);
            
            // Collect weaknesses
            const weaknesses = Array.from(document.querySelectorAll('.skill-tag[data-type="weakness"].bg-secondary'))
                                   .map(el => el.textContent.replace('check', '').trim());
            document.getElementById('hidden_points_faibles').value = JSON.stringify(weaknesses);
            
            // Collect availability
            const disponibilites = [];
            const rows = document.querySelectorAll('tbody tr');
            const days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
            
            rows.forEach(row => {
                const timeStr = row.querySelector('td:first-child').textContent.trim();
                const checkboxes = row.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach((cb, index) => {
                    if (cb.checked && days[index]) {
                        disponibilites.push(`${days[index]} ${timeStr}`);
                    }
                });
            });
            document.getElementById('hidden_disponibilites').value = JSON.stringify(disponibilites);
            
            // form.submit() will be called automatically since we removed e.preventDefault()
        });
    }
});
