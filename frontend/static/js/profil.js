const { createApp, ref, onMounted } = Vue;

try {
    createApp({
        setup() {
            const activeTab = ref('bio');
            
            const showContactModal = ref(false);
            const showProposeModal = ref(false);
            const contactMessage = ref('');
            
            const proposeSubject = ref('');
            const proposeDate = ref('');
            const proposeNote = ref('');
            
            const isSending = ref(false);
            const showToast = ref(false);
            const toastMessage = ref('');

            // Profile DB from Django
            const profile = ref(window.DJANGO_PROFILE_DATA || {
                name: "Profil Introuvable",
                title: "Erreur",
                avatar: "",
                skills: [],
                objectives: [],
                reviews: [],
                availability: "",
                bio: ""
            });

            onMounted(() => {
                // Pre-populate proposition subject
                if (profile.value.skills && profile.value.skills.length > 0) {
                    proposeSubject.value = profile.value.skills[0];
                }
            });

            // Modal actions
            const openContact = () => {
                contactMessage.value = `Bonjour ${profile.value.name}, j'ai vu votre profil sur IFRI MentorLink et je souhaitais échanger avec vous.`;
                showContactModal.value = true;
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
                const dest_id = profile.value.mentor_id || profile.value.id;
                if (!contactMessage.value.trim() || !dest_id) return;
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
                            destinataire_id: dest_id,
                            contenu: contactMessage.value
                        })
                    });
                    
                    if (response.ok) {
                        showContactModal.value = false;
                        contactMessage.value = '';
                        window.location.href = `/profiles/messagerie/?user_id=${dest_id}`;
                    } else {
                        console.error("Erreur d'envoi", await response.json());
                    }
                } catch (error) {
                    console.error("Erreur réseau", error);
                } finally {
                    isSending.value = false;
                }
            };

            const openPropose = () => {
                showProposeModal.value = true;
            };

            const submitProposition = () => {
                if (!proposeSubject.value || !proposeDate.value) return;
                isSending.value = true;
                setTimeout(() => {
                    isSending.value = false;
                    showProposeModal.value = false;
                    toastMessage.value = "Proposition de mentorat transmise !";
                    showToast.value = true;
                    setTimeout(() => showToast.value = false, 3000);
                    
                    // Reset
                    proposeDate.value = '';
                    proposeNote.value = '';
                }, 1500);
            };

            const hasAvailability = (day, slot) => {
                const searchStr = `${day} ${slot}`;
                return profile.value.disponibilites && profile.value.disponibilites.includes(searchStr);
            };

            return {
                activeTab,
                profile,
                showContactModal,
                showProposeModal,
                contactMessage,
                proposeSubject,
                proposeDate,
                proposeNote,
                isSending,
                showToast,
                toastMessage,
                openContact,
                sendMessage,
                openPropose,
                submitProposition,
                hasAvailability
            };
        }
    }).mount('#app');
} catch (e) {
    console.error("Vue mounting error:", e);
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '100%';
    div.style.background = '#d90429';
    div.style.color = 'white';
    div.style.padding = '20px';
    div.style.zIndex = '99999';
    div.innerText = "Vue Error: " + e.message + "\nStack: " + e.stack;
    document.body.appendChild(div);
}
