const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        const searchQuery = ref('');
        const sortBy = ref('compatibility');
        
        const showContactModal = ref(false);
        const selectedMentor = ref(null);
        const contactMessage = ref('');
        const isSending = ref(false);
        const showToast = ref(false);

        const matches = ref(window.MATCHS_DATA || []);

        const filteredMatches = computed(() => {
            let list = matches.value.filter(m => {
                const query = searchQuery.value.toLowerCase().trim();
                return m.name.toLowerCase().includes(query) || 
                       m.filiere.toLowerCase().includes(query) || 
                       m.skills.some(s => s.toLowerCase().includes(query));
            });

            if (sortBy.value === 'compatibility') {
                list.sort((a, b) => b.compatibility - a.compatibility);
            } else if (sortBy.value === 'filiere') {
                const userFiliere = window.USER_FILIERE_CODE || '';
                list.sort((a, b) => {
                    const aSame = a.filiere_code === userFiliere ? 1 : 0;
                    const bSame = b.filiere_code === userFiliere ? 1 : 0;
                    if (aSame !== bSame) {
                        return bSame - aSame; // Même filière en premier
                    }
                    return a.filiere.localeCompare(b.filiere);
                });
            } else if (sortBy.value === 'disponibility') {
                list.sort((a, b) => {
                    const aAvail = a.isAvailableSoon ? 1 : 0;
                    const bAvail = b.isAvailableSoon ? 1 : 0;
                    if (aAvail !== bAvail) {
                        return bAvail - aAvail; // Disponibles en premier
                    }
                    return b.compatibility - a.compatibility; // Fallback sur le score
                });
            }

            return list;
        });

        const openContact = (mentor) => {
            selectedMentor.value = mentor;
            contactMessage.value = `Bonjour ${mentor.name}, je souhaiterais solliciter votre mentorat en ${mentor.filiere} concernant mes cours et projets académiques.`;
            showContactModal.value = true;
        };

        const closeContact = () => {
            showContactModal.value = false;
            selectedMentor.value = null;
            contactMessage.value = '';
        };

        const getCookie = (name) => {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };

        const sendMessage = async () => {
            if (!contactMessage.value.trim() || !selectedMentor.value) return;
            isSending.value = true;
            
            try {
                const csrfToken = getCookie('csrftoken');
                
                const response = await fetch('/profiles/api/envoyer-message/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    body: JSON.stringify({
                        destinataire_id: selectedMentor.value.mentor_id || selectedMentor.value.id,
                        contenu: contactMessage.value
                    })
                });
                
                if (response.ok) {
                    const dest_id = selectedMentor.value.mentor_id || selectedMentor.value.id;
                    showContactModal.value = false;
                    contactMessage.value = '';
                    window.location.href = `/profiles/messagerie/?user_id=${dest_id}`;
                } else {
                    console.error('Erreur lors de l\'envoi', await response.json());
                }
            } catch (error) {
                console.error('Erreur réseau', error);
            } finally {
                isSending.value = false;
            }
        };

        return {
            searchQuery,
            sortBy,
            filteredMatches,
            showContactModal,
            selectedMentor,
            contactMessage,
            isSending,
            showToast,
            openContact,
            closeContact,
            sendMessage
        };
    }
}).mount('#app');
