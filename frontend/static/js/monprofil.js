const { createApp, ref, onMounted } = Vue;

try {
    createApp({
        setup() {
            const activeTab = ref('bio');
            const showToast = ref(false);
            const toastMessage = ref('');

            // Current User Profile
            const profile = ref(window.DJANGO_PROFILE_DATA || {
                id: 99,
                name: "Nom inconnu",
                title: "Étudiant",
                avatar: "",
                location: "",
                levelAndFiliere: "",
                statsMentoring: "0",
                statsProjects: "0",
                bio: "",
                skills: [],
                objectives: [],
                reviews: [],
                availability: "",
                online: true,
                badgeTitle: "",
                badgeSub: ""
            });

            const hasAvailability = (day, slot) => {
                const searchStr = `${day} ${slot}`;
                return profile.value.disponibilites && profile.value.disponibilites.includes(searchStr);
            };

            return {
                activeTab,
                profile,
                showToast,
                toastMessage,
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
