const { createApp, ref, onMounted } = Vue;

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

        // Profile DB
        const profiles = {
            1: {
                id: 1,
                name: "Dr. Arnaud Zinsou",
                title: "Mentor de Master en Génie Logiciel (IFRI)",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWl31smWdHXpZ2Bk4ugGLW5mgD9Q6KzowRGjMZ8KGABEVrj1WKNw1jSr07KJ3WNsStZ-hkjZdVO2oErbJ7zB-EVeDY1Cd54Q8MLHCnBQ1gMhJnUMaoE_BAAOXWp_9_iX5EVGUutQuaaOxwxCalL-txZN870ZYh5LuInijSC9cjab6FbPb_jDGB2IaJS60x1WnlYSFLPMqJ_0BA70Ix04GozqziHilqPTjJL3I4TQSsrFWadjeGRR31QaDnRD5I4qlefPVuylqQtDo",
                matchScore: 95,
                location: "Abomey-Calavi, Bénin",
                levelAndFiliere: "M2 - Génie Logiciel",
                statsMentoring: "18",
                statsProjects: "24",
                bio: "Passionné par l'architecture logicielle, le Clean Code et l'ingénierie dirigée par les modèles. J'accompagne depuis deux ans les étudiants de licence dans l'apprentissage de Java, Python et la structuration de projets d'intégration de fin d'études.",
                skills: ["Architecture Logicielle", "Python Advanced", "Machine Learning", "Clean Code", "Java", "SQL"],
                objectives: [
                    { icon: "school", title: "Soutien Académique", description: "Aide sur les concepts avancés d'algorithmes et de design patterns." },
                    { icon: "code", title: "Revue de Code", description: "Conseils pour rendre votre code source professionnel et maintenable." }
                ],
                reviews: [
                    { id: 1, author: "Ablavi G.", rating: 5, text: "Excellent mentor ! Grâce à lui, j'ai structuré mon application mobile proprement." },
                    { id: 2, author: "Koffi A.", rating: 5, text: "Ses conseils en architecture m'ont fait gagner un temps précieux sur mon projet." }
                ],
                availability: "Je suis libre tous les mercredis après-midi et samedis matin pour des sessions en présentiel à l'IFRI ou en visio.",
                online: true,
                badgeTitle: "Mentor Certifié",
                badgeSub: "ÉVALUATION 4.9/5"
            },
            2: {
                id: 2,
                name: "Gloria Deguenon",
                title: "Étudiante en M1 Cybersécurité (IFRI)",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9UQmJbPMwD32n-BJrd8mOL7wLFNM9S5DB0PK_NRo1hnzR2OhpswFtAQxu30hpWOMBM5E3PZ_xYptByUtRMP7mYGDmjmI1ZdVm8vv5z4UZ2ZEW6LxmNkSRFdvFz0SAE8J5S1_F3QAzi9cksnIUdG1hdCBJmN5f7QyWg0ZARSfpbqNhZRQfXEIxRKd_pZflkr11kEAYseNyAUHLBUZY7aRcd5HHGwZBbwu24gOwoRTr6F5m3QKRob4MFurafQbOoBvvr2TXiFyhXSA",
                matchScore: 83,
                location: "Cotonou, Bénin",
                levelAndFiliere: "M1 - Cybersécurité",
                statsMentoring: "9",
                statsProjects: "11",
                bio: "Spécialisée en sécurité informatique, je m'intéresse au Ethical Hacking, à la sécurité des applications web et à l'administration Linux. J'aime partager mes connaissances pratiques sur les réseaux et la configuration de pare-feu.",
                skills: ["Ethical Hacking", "Cloud Security", "Linux Admin", "Firewalls", "Réseaux Informatiques"],
                objectives: [
                    { icon: "security", title: "Audit de Sécurité", description: "Aide pour comprendre les vulnérabilités courantes et comment s'en prémunir." },
                    { icon: "terminal", title: "Pratique Linux", description: "Prise en main de l'administration système en ligne de commande." }
                ],
                reviews: [
                    { id: 1, author: "Euloge S.", rating: 4, text: "Très pédagogue. Les TPs sur Linux sont devenus clairs." }
                ],
                availability: "Disponible les vendredis après-midi et soirs en visioconférence pour du soutien.",
                online: true,
                badgeTitle: "Pentester Junior",
                badgeSub: "ÉVALUATION 4.7/5"
            },
            3: {
                id: 3,
                name: "Samuel Kpadonou",
                title: "Étudiant en L3 Data Science (IFRI)",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFCqwOLzi5ve-o3KqaPnl4HdMsguh88_uT8T04UMF4lAOfou5IzIIHfFQzQWmG4qLuGPRfDnJAvN15Ij6jaxIGpPr1wVpKCOU6vnzQXQOBZClMHqSnrjrIwUBydb86SUt--t5o5j230144-hJGHrZkYQcNevqg1-7e69oTiGQdEqnwpgfL7TaO_HSM387rKHT-HzlwxUN8fwjudM57-2shgTVtVcS8JGStY2AGGZkwGlxenWqRP349c5io1P9cXT200LXzJXkOPWE",
                matchScore: 72,
                location: "Campus d'Abomey-Calavi",
                levelAndFiliere: "L3 - Data Science",
                statsMentoring: "5",
                statsProjects: "15",
                bio: "Passionné d'analyse de données, de modélisation mathématique et d'intelligence artificielle. J'aide à comprendre la manipulation de données en R et Python, ainsi que l'utilisation avancée du langage SQL.",
                skills: ["Data Analysis", "R programming", "SQL", "Pandas", "Mathématiques"],
                objectives: [
                    { icon: "analytics", title: "Analyse Statistique", description: "Support sur les représentations de données et analyses prédictives." }
                ],
                reviews: [],
                availability: "Libre en semaine à partir de 17h ou les samedis toute la journée.",
                online: false,
                badgeTitle: "Data Analyst",
                badgeSub: "ÉVALUATION 4.5/5"
            },
            11: {
                id: 11,
                name: "Ablavi G.",
                title: "Étudiante en L2 Génie Logiciel (IFRI)",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB-MP5RDIm8Zgunzu5nrq1YCQInShYJH_hGcbu12T_GA9DTmA2jyhr6vMHEanrPgZXx-WIDVfj_R2Zwu-ORpnu2UMKjFr3nOdA1plSUWCB2CGpT44gvSSuN7PN4pgI7K2NmLRMI4UkCR7Tov7Y5HRVMBH1ASHizPHMY7WF5Tyjz_T18t0zpUYahiyDc-JaDZqXPxEBV2f9nPjIICTFiTGsI5jQQYozZ0LTsn0Xn4HkJgRToIc-4cUGhYUKNmU9F_ENEXmPSd2N9Is",
                matchScore: 87,
                location: "Abomey-Calavi, Bénin",
                levelAndFiliere: "L2 - Génie Logiciel",
                statsMentoring: "4",
                statsProjects: "12",
                bio: "Passionnée par le développement mobile et l'intelligence artificielle, je suis actuellement en deuxième année de licence à l'IFRI. Mon parcours académique m'a permis de consolider mes bases en algorithmique et en développement Web. Je recherche un mentor capable de m'orienter vers les meilleures pratiques en architecture logicielle.",
                skills: ["Java", "Python", "SQL", "Dart & Flutter", "UI/UX Design", "Algorithmique"],
                objectives: [
                    { icon: "lightbulb", title: "Orientation Carrière", description: "Découvrir les métiers du Cloud et de la Cybersécurité." },
                    { icon: "code", title: "Revue de Code", description: "Améliorer la qualité et la propreté du code source de mes applications." }
                ],
                reviews: [
                    { id: 1, author: "Modeste T.", rating: 4, text: "Étudiante motivée et très curieuse. Un plaisir d'échanger !" }
                ],
                availability: "Je suis libre tous les samedis matin pour des sessions en présentiel à l'IFRI ou en visioconférence.",
                online: true,
                badgeTitle: "Major de Promotion",
                badgeSub: "ANNÉE 2023"
            }
        };

        const profile = ref(profiles[11]); // Default to Ablavi

        onMounted(() => {
            const params = new URLSearchParams(window.location.search);
            const id = parseInt(params.get('id'));
            if (id && profiles[id]) {
                profile.value = profiles[id];
            }
            
            // Pre-populate proposition subject
            if (profile.value.skills.length > 0) {
                proposeSubject.value = profile.value.skills[0];
            }
        });

        // Modal actions
        const openContact = () => {
            contactMessage.value = `Bonjour ${profile.value.name}, j'ai vu votre profil sur IFRI MentorLink et je souhaitais échanger avec vous.`;
            showContactModal.value = true;
        };

        const sendMessage = () => {
            if (!contactMessage.value.trim()) return;
            isSending.value = true;
            setTimeout(() => {
                isSending.value = false;
                showContactModal.value = false;
                toastMessage.value = "Message envoyé avec succès !";
                showToast.value = true;
                setTimeout(() => showToast.value = false, 3000);
            }, 1500);
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
            submitProposition
        };
    }
}).mount('#app');
