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

    // ── 2. Skills (points_forts & points_faibles) avec MatierePicker ──
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

    // Initialiser MatierePicker pour les points forts
    if (addStrengthBtn && window.MatierePicker) {
        new window.MatierePicker({
            triggerEl:    addStrengthBtn,
            selectedList: strengths,
            accentColor:  'strength',
            onChange: (list) => {
                strengths = list;
                renderStrengths();
                // Mettre à jour le libellé du bouton
                addStrengthBtn.textContent = list.length === 0
                    ? '+ Choisir des compétences'
                    : `${list.length} compétence${list.length > 1 ? 's' : ''} ✓`;
            }
        });
        addStrengthBtn.textContent = strengths.length === 0
            ? '+ Choisir des compétences'
            : `${strengths.length} compétence${strengths.length > 1 ? 's' : ''} ✓`;
    }

    // Initialiser MatierePicker pour les points faibles
    if (addWeaknessBtn && window.MatierePicker) {
        new window.MatierePicker({
            triggerEl:    addWeaknessBtn,
            selectedList: weaknesses,
            accentColor:  'weakness',
            onChange: (list) => {
                weaknesses = list;
                renderWeaknesses();
                // Mettre à jour le libellé du bouton
                addWeaknessBtn.textContent = list.length === 0
                    ? '+ Choisir des sujets'
                    : `${list.length} sujet${list.length > 1 ? 's' : ''} ✓`;
            }
        });
        addWeaknessBtn.textContent = weaknesses.length === 0
            ? '+ Choisir des sujets'
            : `${weaknesses.length} sujet${weaknesses.length > 1 ? 's' : ''} ✓`;
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

    // ── 4. Image Previews & Deletions ──
    console.log("Initialisation de la gestion des images...");
    const inputCouverture = document.getElementById('input-couverture');
    const deleteCouvertureInput = document.getElementById('delete_photo_couverture_input');
    const btnDeleteCouverture = document.getElementById('btn-delete-couverture');
    
    if (inputCouverture) {
        console.log("Input couverture trouvé");
        inputCouverture.addEventListener('change', function() {
            console.log("Changement d'image couverture détecté, fichiers:", this.files?.length);
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
                if (deleteCouvertureInput) {
                    deleteCouvertureInput.value = 'false';
                }
                if (btnDeleteCouverture) {
                    btnDeleteCouverture.classList.remove('hidden');
                    btnDeleteCouverture.style.removeProperty('display');
                }
            }
        });
    } else {
        console.warn("Input couverture NON trouvé !");
    }

    if (btnDeleteCouverture) {
        console.log("Bouton supprimer couverture trouvé");
        btnDeleteCouverture.addEventListener('click', function(e) {
            console.log("Clic sur supprimer couverture");
            e.stopPropagation();
            e.preventDefault();
            const img = document.getElementById('preview-couverture');
            const ph = document.getElementById('placeholder-couverture');
            if (img) {
                img.classList.add('hidden');
                img.src = '';
            }
            if (ph) {
                ph.classList.remove('hidden');
            }
            if (deleteCouvertureInput) {
                deleteCouvertureInput.value = 'true';
                console.log("delete_photo_couverture set to true");
            }
            if (inputCouverture) {
                inputCouverture.value = ''; // Reset file input
            }
            // Hide the delete button itself
            this.style.display = 'none';
        });
    } else {
        console.warn("Bouton supprimer couverture NON trouvé !");
    }

    const inputAvatar = document.getElementById('input-avatar');
    const deleteAvatarInput = document.getElementById('delete_photo_profil_input');
    const btnDeleteAvatar = document.getElementById('btn-delete-avatar');
    
    if (inputAvatar) {
        console.log("Input avatar trouvé");
        inputAvatar.addEventListener('change', function() {
            console.log("Changement d'image avatar détecté, fichiers:", this.files?.length);
            if (this.files && this.files[0]) {
                const img = document.getElementById('preview-avatar');
                if (img) {
                    img.src = URL.createObjectURL(this.files[0]);
                }
                if (deleteAvatarInput) {
                    deleteAvatarInput.value = 'false';
                }
                if (btnDeleteAvatar) {
                    btnDeleteAvatar.classList.remove('hidden');
                    btnDeleteAvatar.style.removeProperty('display');
                }
            }
        });
    } else {
        console.warn("Input avatar NON trouvé !");
    }

    if (btnDeleteAvatar) {
        console.log("Bouton supprimer avatar trouvé");
        btnDeleteAvatar.addEventListener('click', function(e) {
            console.log("Clic sur supprimer avatar");
            e.stopPropagation();
            e.preventDefault();
            const img = document.getElementById('preview-avatar');
            if (img) {
                // Revenir sur l'avatar par défaut de ui-avatars
                const firstName = document.querySelector('input[name="first_name"]')?.value || 'User';
                const lastName = document.querySelector('input[name="last_name"]')?.value || '';
                img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}+${encodeURIComponent(lastName)}&background=random`;
            }
            if (deleteAvatarInput) {
                deleteAvatarInput.value = 'true';
                console.log("delete_photo_profil set to true");
            }
            if (inputAvatar) {
                inputAvatar.value = ''; // Reset file input
            }
            // Hide the delete button itself
            this.style.display = 'none';
        });
    } else {
        console.warn("Bouton supprimer avatar NON trouvé !");
    }
});
