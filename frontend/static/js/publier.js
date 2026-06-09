const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        const isSubmitting = ref(false);
        const showToast    = ref(false);

        const days = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
        const timeSlots = [
            { id: "matin",      label: "MATIN"    },
            { id: "apresmidi",  label: "APRÈS-M"  },
            { id: "soir",       label: "SOIR"     }
        ];

        // Tableau des matières sélectionnées (mis à jour par MatierePicker via mounted)
        const selectedSubjects = ref([]);

        const formData = ref({
            type:        'propose',
            subjects:    [],
            format:      'présentiel',
            slots:       [],
            description: ''
        });

        // Placeholder dynamique
        const descriptionPlaceholder = computed(() =>
            formData.value.type === 'cherche'
                ? "Décrivez vos difficultés actuelles, ce que vous souhaitez comprendre et vos objectifs d'apprentissage..."
                : "Décrivez vos compétences clés, votre filière, vos points forts et comment vous pouvez aider vos camarades..."
        );

        // Grille de disponibilités
        const toggleSlot = (day, timeSlotId) => {
            const key   = `${day}_${timeSlotId}`;
            const index = formData.value.slots.indexOf(key);
            if (index > -1) {
                formData.value.slots.splice(index, 1);
            } else {
                formData.value.slots.push(key);
            }
        };

        const isSlotSelected = (day, timeSlotId) =>
            formData.value.slots.includes(`${day}_${timeSlotId}`);

        // Retire une matière du tag cloud Vue
        const removeSubject = (name) => {
            const idx = selectedSubjects.value.indexOf(name);
            if (idx > -1) selectedSubjects.value.splice(idx, 1);
            formData.value.subjects = [...selectedSubjects.value];
            _updatePickerLabel(selectedSubjects.value);
        };

        const _updatePickerLabel = (list) => {
            const label = document.getElementById('picker-subject-label');
            if (label) {
                label.textContent = list.length === 0
                    ? 'Choisir les matières'
                    : `${list.length} matière${list.length > 1 ? 's' : ''} choisie${list.length > 1 ? 's' : ''}`;
            }
        };

        const getCookie = (name) => {
            let value = null;
            if (document.cookie && document.cookie !== '') {
                document.cookie.split(';').forEach(c => {
                    const cookie = c.trim();
                    if (cookie.startsWith(name + '=')) {
                        value = decodeURIComponent(cookie.substring(name.length + 1));
                    }
                });
            }
            return value;
        };

        const submitForm = async () => {
            isSubmitting.value = true;
            formData.value.subjects = [...selectedSubjects.value];

            try {
                let csrfToken = getCookie('csrftoken');
                if (!csrfToken) {
                    const el = document.getElementById('csrf_token');
                    csrfToken = el ? el.value : '';
                }

                const response = await fetch('/matching/publier/', {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
                    body:    JSON.stringify(formData.value)
                });

                if (response.ok) {
                    showToast.value = true;
                    // Réinitialiser
                    selectedSubjects.value.splice(0);
                    formData.value.subjects     = [];
                    formData.value.slots        = [];
                    formData.value.description  = '';
                    _updatePickerLabel([]);

                    setTimeout(() => {
                        showToast.value = false;
                        window.location.href = '/matching/matchs/';
                    }, 2000);
                } else {
                    console.error('Erreur publication', await response.json());
                }
            } catch (err) {
                console.error('Erreur réseau', err);
            } finally {
                isSubmitting.value = false;
            }
        };

        return {
            isSubmitting, showToast,
            days, timeSlots,
            selectedSubjects, formData,
            descriptionPlaceholder,
            toggleSlot, isSlotSelected,
            removeSubject, submitForm,
            _updatePickerLabel
        };
    },

    mounted() {
        // Initialiser MatierePicker après le montage du composant Vue
        const triggerBtn = document.getElementById('picker-subject-btn');
        if (triggerBtn && window.MatierePicker) {
            new window.MatierePicker({
                triggerEl:    triggerBtn,
                selectedList: this.selectedSubjects,
                accentColor:  'subject',
                onChange: (list) => {
                    this.formData.subjects = [...list];
                    this._updatePickerLabel(list);
                }
            });
        }
    }
}).mount('#app');
