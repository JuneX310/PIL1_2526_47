const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const activeTab = ref('bio');
        const showToast = ref(false);
        const toastMessage = ref('');

        // Current User Profile
        const profile = ref({
            id: 99,
            name: "Koffi Kouamé",
            title: "Étudiant en M1 Génie Logiciel (IFRI)",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN54N3U_JeFSlRvBog4y0iJKUCp8zYmAhB0tVG5zHygrZsFfm3jXwtZFRSfDOVcSe2lTEF48W8eJFhdW0xxttNWSRRFbZZl1xEedHpuIzBdIgKiGUWLOVbg2NkbyOZYSQBmpaQo-69bxaALDHt_aXvn6h2BKbODL5TloDe5bwEGW9wN9WB4Xkvu0h6ry4Y5WWdhODkK46j1BiIJAj9GT899sBYb5MpXe_Z47HuyEoNkf1OM7DxT8hq39RgI-iAHCv-0NUug9GM340",
            location: "Abomey-Calavi, Bénin",
            levelAndFiliere: "M1 - Génie Logiciel",
            statsMentoring: "0",
            statsProjects: "4",
            bio: "Étudiant passionné par le développement web et l'IA. J'aime partager mes connaissances et apprendre des autres. Je cherche à approfondir mes compétences en Architecture Logicielle.",
            skills: ["React.js", "Algorithmique", "Python"],
            objectives: [
                { icon: "school", title: "Soutien Académique", description: "Je recherche du soutien sur les patrons de conception (design patterns) et l'architecture logicielle propre." },
                { icon: "work", title: "Projets Professionnels", description: "Collaborer sur des projets d'intégration pratiques et trouver des opportunités de stage." }
            ],
            reviews: [],
            availability: "Lundi (8h-10h, 16h-18h), Mardi (12h-14h), Mercredi (8h-14h), Vendredi (8h-10h, 16h-18h)",
            online: true,
            badgeTitle: "Étudiant Mentoré",
            badgeSub: "FILIÈRE GÉNIE LOGICIEL"
        });

        return {
            activeTab,
            profile,
            showToast,
            toastMessage
        };
    }
}).mount('#app');
