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
            if (currentStep < steps.length - 1) {
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
            e.preventDefault();
            alert('Inscription réussie ! Redirection vers votre tableau de bord...');
            window.location.href = "/accounts/dashboard/";
        });
    }
});
