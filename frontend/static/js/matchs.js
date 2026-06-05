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

        const matches = ref([
            {
                id: 1,
                name: "Dr. Arnaud Zinsou",
                filiere: "Génie Logiciel",
                niveau: "M2",
                location: "Campus d'Abomey-Calavi",
                skills: ["Architecture Logicielle", "Python Advanced", "Machine Learning", "Clean Code"],
                compatibility: 95,
                nextAvailability: "Demain, 14h00",
                isAvailableSoon: true,
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWl31smWdHXpZ2Bk4ugGLW5mgD9Q6KzowRGjMZ8KGABEVrj1WKNw1jSr07KJ3WNsStZ-hkjZdVO2oErbJ7zB-EVeDY1Cd54Q8MLHCnBQ1gMhJnUMaoE_BAAOXWp_9_iX5EVGUutQuaaOxwxCalL-txZN870ZYh5LuInijSC9cjab6FbPb_jDGB2IaJS60x1WnlYSFLPMqJ_0BA70Ix04GozqziHilqPTjJL3I4TQSsrFWadjeGRR31QaDnRD5I4qlefPVuylqQtDo"
            },
            {
                id: 2,
                name: "Gloria Deguenon",
                filiere: "Cybersécurité",
                niveau: "M1",
                location: "Hybride / IFRI",
                skills: ["Ethical Hacking", "Cloud Security", "Linux Admin", "Firewalls"],
                compatibility: 83,
                nextAvailability: "Vendredi, 09h00",
                isAvailableSoon: true,
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9UQmJbPMwD32n-BJrd8mOL7wLFNM9S5DB0PK_NRo1hnzR2OhpswFtAQxu30hpWOMBM5E3PZ_xYptByUtRMP7mYGDmjmI1ZdVm8vv5z4UZ2ZEW6LxmNkSRFdvFz0SAE8J5S1_F3QAzi9cksnIUdG1hdCBJmN5f7QyWg0ZARSfpbqNhZRQfXEIxRKd_pZflkr11kEAYseNyAUHLBUZY7aRcd5HHGwZBbwu24gOwoRTr6F5m3QKRob4MFurafQbOoBvvr2TXiFyhXSA"
            },
            {
                id: 3,
                name: "Samuel Kpadonou",
                filiere: "Data Science",
                niveau: "L3",
                location: "À distance",
                skills: ["Data Analysis", "R programming", "SQL", "Pandas"],
                compatibility: 72,
                nextAvailability: "Lundi prochain",
                isAvailableSoon: false,
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFCqwOLzi5ve-o3KqaPnl4HdMsguh88_uT8T04UMF4lAOfou5IzIIHfFQzQWmG4qLuGPRfDnJAvN15Ij6jaxIGpPr1wVpKCOU6vnzQXQOBZClMHqSnrjrIwUBydb86SUt--t5o5j230144-hJGHrZkYQcNevqg1-7e69oTiGQdEqnwpgfL7TaO_HSM387rKHT-HzlwxUN8fwjudM57-2shgTVtVcS8JGStY2AGGZkwGlxenWqRP349c5io1P9cXT200LXzJXkOPWE"
            }
        ]);

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
                list.sort((a, b) => a.filiere.localeCompare(b.filiere));
            } else if (sortBy.value === 'disponibility') {
                list.sort((a, b) => (b.isAvailableSoon ? 1 : 0) - (a.isAvailableSoon ? 1 : 0));
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

        const sendMessage = () => {
            if (!contactMessage.value.trim()) return;
            isSending.value = true;
            
            setTimeout(() => {
                isSending.value = false;
                showContactModal.value = false;
                showToast.value = true;
                
                setTimeout(() => {
                    showToast.value = false;
                }, 3000);
            }, 1500);
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
