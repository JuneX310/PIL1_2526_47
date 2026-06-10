document.addEventListener('DOMContentLoaded', () => {
    // ── 1. Availabilities pre-selection and grid interactions ──
    if (window.USER_DISPONIBILITES) {
        const days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
        const timeSlots = ['08:00 - 12:00', '14:00 - 17:00', '18:00 - 21:00'];
        const columns = document.querySelectorAll('.grid-cols-7 > div.flex-col');
        
        columns.forEach((col, dayIndex) => {
            const slots = col.querySelectorAll('div.rounded');
            slots.forEach((slot, timeIndex) => {
                const slotStr = `${days[dayIndex]} ${timeSlots[timeIndex]}`;
                if (window.USER_DISPONIBILITES.includes(slotStr)) {
                    slot.classList.add('bg-primary');
                    slot.classList.remove('bg-surface-container-low', 'border', 'border-outline-variant');
                } else {
                    slot.classList.remove('bg-primary');
                    slot.classList.add('bg-surface-container-low', 'border', 'border-outline-variant');
                }
            });
        });
    }

    // Micro-interaction for availability grid click
    document.querySelectorAll('.grid div').forEach(slot => {
        if (!slot.classList.contains('rounded')) return;
        
        slot.addEventListener('click', function() {
            if (this.classList.contains('bg-primary')) {
                this.classList.remove('bg-primary');
                this.classList.add('bg-surface-container-low', 'border', 'border-outline-variant');
            } else {
                this.classList.add('bg-primary');
                this.classList.remove('bg-surface-container-low', 'border', 'border-outline-variant');
            }
        });
    });

    // ── 2. Skills (points_forts & points_faibles) dynamic management ──
    let strengths = window.USER_POINTS_FORTS || [];
    let weaknesses = window.USER_POINTS_FAIBLES || [];

    const containerStrengths = document.getElementById('container-points-forts');
    const containerWeaknesses = document.getElementById('container-points-faibles');
    const addStrengthBtn = document.getElementById('add-strength-btn');
    const addWeaknessBtn = document.getElementById('add-weakness-btn');

    function renderStrengths() {
        // Remove existing skill tags (keep only the add button)
        const tags = containerStrengths.querySelectorAll('span');
        tags.forEach(tag => tag.remove());

        strengths.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bouton text-[12px] flex items-center gap-xs';
            span.innerHTML = `${skill} <button class="material-symbols-outlined text-[14px]" type="button">close</button>`;
            
            // Delete button listener
            span.querySelector('button').addEventListener('click', () => {
                strengths = strengths.filter(s => s !== skill);
                renderStrengths();
            });

            containerStrengths.insertBefore(span, addStrengthBtn);
        });
    }

    function renderWeaknesses() {
        // Remove existing tags (keep only the add button)
        const tags = containerWeaknesses.querySelectorAll('span');
        tags.forEach(tag => tag.remove());

        weaknesses.forEach(subject => {
            const span = document.createElement('span');
            span.className = 'bg-secondary-container/20 text-on-secondary-container px-3 py-1.5 rounded-full font-bouton text-[12px] flex items-center gap-xs';
            span.innerHTML = `${subject} <button class="material-symbols-outlined text-[14px]" type="button">close</button>`;
            
            // Delete button listener
            span.querySelector('button').addEventListener('click', () => {
                weaknesses = weaknesses.filter(w => w !== subject);
                renderWeaknesses();
            });

            containerWeaknesses.insertBefore(span, addWeaknessBtn);
        });
    }

    if (addStrengthBtn) {
        addStrengthBtn.addEventListener('click', () => {
            const newSkill = prompt("Entrez une compétence ou matière forte (ex: Python, HTML) :");
            if (newSkill && newSkill.trim()) {
                const trimmed = newSkill.trim();
                if (!strengths.includes(trimmed)) {
                    strengths.push(trimmed);
                    renderStrengths();
                }
            }
        });
    }

    if (addWeaknessBtn) {
        addWeaknessBtn.addEventListener('click', () => {
            const newSubject = prompt("Entrez un sujet sur lequel vous recherchez du soutien (ex: DevOps, Mathématiques) :");
            if (newSubject && newSubject.trim()) {
                const trimmed = newSubject.trim();
                if (!weaknesses.includes(trimmed)) {
                    weaknesses.push(trimmed);
                    renderWeaknesses();
                }
            }
        });
    }

    // Initial render
    if (containerStrengths) renderStrengths();
    if (containerWeaknesses) renderWeaknesses();

    // ── 3. Form submission preparation ──
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Availabilities collection
            const disponibilites = [];
            const days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
            const timeSlots = ['08:00 - 12:00', '14:00 - 17:00', '18:00 - 21:00'];
            
            const columns = document.querySelectorAll('.grid-cols-7 > div.flex-col');
            columns.forEach((col, dayIndex) => {
                const slots = col.querySelectorAll('div.rounded');
                slots.forEach((slot, timeIndex) => {
                    if (slot.classList.contains('bg-primary')) {
                        disponibilites.push(`${days[dayIndex]} ${timeSlots[timeIndex]}`);
                    }
                });
            });
            
            let hiddenDispo = document.getElementById('hidden_disponibilites');
            if (!hiddenDispo) {
                hiddenDispo = document.createElement('input');
                hiddenDispo.type = 'hidden';
                hiddenDispo.name = 'disponibilites';
                hiddenDispo.id = 'hidden_disponibilites';
                form.appendChild(hiddenDispo);
            }
            hiddenDispo.value = JSON.stringify(disponibilites);

            // Skills collections submission
            document.getElementById('hidden_points_forts').value = JSON.stringify(strengths);
            document.getElementById('hidden_points_faibles').value = JSON.stringify(weaknesses);
        });
    }

    // ── 4. Image Previews ──
    const inputCouverture = document.querySelector('input[name="photo_couverture"]');
    if (inputCouverture) {
        inputCouverture.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const img = document.getElementById('preview-couverture');
                const ph = document.getElementById('placeholder-couverture');
                if (img) {
                    img.src = URL.createObjectURL(this.files[0]);
                    img.classList.remove('hidden');
                }
                if (ph) {
                    ph.classList.add('hidden');
                }
                if (this.parentElement && this.parentElement.parentElement) {
                    this.parentElement.parentElement.classList.add('border-b-4', 'border-primary');
                }
            }
        });
    }

    const inputAvatar = document.querySelector('input[name="photo_profil"]');
    if (inputAvatar) {
        inputAvatar.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const img = document.getElementById('preview-avatar');
                if (img) {
                    img.src = URL.createObjectURL(this.files[0]);
                }
                if (this.parentElement && this.parentElement.parentElement) {
                    this.parentElement.parentElement.classList.add('border-primary');
                }
            }
        });
    }
});
