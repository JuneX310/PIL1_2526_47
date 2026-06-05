const { createApp, ref, computed, nextTick } = Vue;

createApp({
    setup() {
        const isSubmitting = ref(false);
        const showToast = ref(false);
        
        // Custom Subject Input state
        const showCustomInput = ref(false);
        const newSubjectName = ref('');
        const customInput = ref(null);

        const days = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
        const timeSlots = [
            { id: "matin", label: "MATIN" },
            { id: "apresmidi", label: "APRÈS-M" },
            { id: "soir", label: "SOIR" }
        ];

        const availableSubjects = ref([
            { id: 1, name: "Algorithmique" },
            { id: 2, name: "Réseaux Informatiques" },
            { id: 3, name: "Développement Web" },
            { id: 4, name: "Data Science" },
            { id: 5, name: "Cybersécurité" }
        ]);

        const formData = ref({
            type: 'propose', // propose vs cherche
            subjects: [],
            format: 'présentiel',
            slots: [], // holds items like "LUN_matin", "MAR_soir"
            description: ''
        });

        // Placeholder changes dynamically
        const descriptionPlaceholder = computed(() => {
            return formData.value.type === 'cherche'
                ? "Décrivez vos difficultés actuelles, ce que vous souhaitez comprendre et vos objectifs d'apprentissage..."
                : "Décrivez vos compétences clés, votre filière, vos points forts et comment vous pouvez aider vos camarades...";
        });

        // Availability Grid logic
        const toggleSlot = (day, timeSlotId) => {
            const key = `${day}_${timeSlotId}`;
            const index = formData.value.slots.indexOf(key);
            if (index > -1) {
                formData.value.slots.splice(index, 1);
            } else {
                formData.value.slots.push(key);
            }
        };

        const isSlotSelected = (day, timeSlotId) => {
            return formData.value.slots.includes(`${day}_${timeSlotId}`);
        };

        // Custom Subject creation
        const openCustomInput = async () => {
            showCustomInput.value = true;
            await nextTick();
            customInput.value.focus();
        };

        const addCustomSubject = () => {
            const name = newSubjectName.value.trim();
            if (name) {
                // Check if already exists
                if (!availableSubjects.value.some(s => s.name.toLowerCase() === name.toLowerCase())) {
                    const newId = availableSubjects.value.length + 1;
                    availableSubjects.value.push({ id: newId, name: name });
                }
                // Auto select it
                if (!formData.value.subjects.includes(name)) {
                    formData.value.subjects.push(name);
                }
            }
            newSubjectName.value = '';
            showCustomInput.value = false;
        };

        // Form Submit logic
        const submitForm = () => {
            isSubmitting.value = true;
            
            // Simulate backend request
            setTimeout(() => {
                isSubmitting.value = false;
                showToast.value = true;
                
                // Reset form fields
                formData.value.subjects = [];
                formData.value.slots = [];
                formData.value.description = '';
                
                // Hide toast after 3s
                setTimeout(() => {
                    showToast.value = false;
                }, 3000);
            }, 1500);
        };

        return {
            isSubmitting,
            showToast,
            showCustomInput,
            newSubjectName,
            customInput,
            days,
            timeSlots,
            availableSubjects,
            formData,
            descriptionPlaceholder,
            toggleSlot,
            isSlotSelected,
            openCustomInput,
            addCustomSubject,
            submitForm
        };
    }
}).mount('#app');
