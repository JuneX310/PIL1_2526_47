const { createApp, ref, computed, watch } = Vue;

createApp({
    setup() {
        const currentTab = ref('offres'); // offres or demandes
        const searchQuery = ref('');
        const currentPage = ref(1);
        const itemsPerPage = 6;
        
        // Filter dropdown state
        const openedMenu = ref(null);
        const activeFilters = ref({
            subject: null,
            format: null,
            filiere: null,
            level: null
        });

        const filterChoices = {
            subject: ["Algorithmique", "Réseaux Informatiques", "Développement Web", "Data Science", "Cybersécurité", "Java", "Python", "Gestion de Projet"],
            format: ["Présentiel", "En ligne", "Les deux"],
            filiere: ["Génie Logiciel", "Intelligence Artificielle", "Sécurité Informatique", "Web & Mobile"],
            level: ["L1", "L2", "L3", "M1", "M2"]
        };

        const openedMenuLabel = computed(() => {
            if (openedMenu.value === 'subject') return 'matière';
            if (openedMenu.value === 'format') return 'format';
            if (openedMenu.value === 'filiere') return 'filière';
            if (openedMenu.value === 'level') return 'niveau';
            return '';
        });

        // Mock database items
        const dbItems = ref([
            // OFFERS (Mentors proposing help)
            {
                id: 1,
                type: "offres",
                name: "Koffi AGOSSOU",
                filiere: "Génie Logiciel",
                niveau: "M2",
                matchScore: 99,
                description: "Passionné par l'architecture logicielle, les bonnes pratiques de codage (Clean Code) et l'écosystème Java. Je peux vous accompagner sur vos projets académiques.",
                subjects: ["Java", "Algorithmique", "SQL"],
                availability: "Mercredi, Samedi, Dimanche",
                format: "Présentiel",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPctlMaplPECRB8inV7MpRzb4w6FNjDBJT4san1XhxerXmzMvgIZln9zgfd6mB8s55L0zOLSus3ujangA5ye9lQtm4zpI0aIIaWSoQGkSqzFCnPp-K4RrWu6OriDTve_d68abp6s3h1uHy9FKK1L7PwYNjcdA29tiWIRbQ2uFZ_LYcMBmwdGqSjMV3WuSS_ULGXMooNQyZ2dIce6hAGXASKiQhNBrsSEEcn35I3yOd8v3KaqnKdqR-ANbm6kAPEw--usDh8-4Mg3o"
            },
            {
                id: 2,
                type: "offres",
                name: "Sena HOUNTON",
                filiere: "Intelligence Artificielle",
                niveau: "M1",
                matchScore: 94,
                description: "Spécialiste Python et Data Science. Actuellement en Master 1, j'aide les L2/L3 à comprendre le Machine Learning, Pandas et NumPy.",
                subjects: ["Python", "Data Science"],
                availability: "Soirs en semaine",
                format: "En ligne",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB56Okjh1NxsrgxILfBl_9jthbgz9Z3Tl91x7PMWomOKRTR-msE7f75Wi2sTyT80IlQqfRhnJXl_4PeQESBCoKyqC-Y5UHwsYqETw_DGGDAjMDDttIdOD59x2fXU-gIajcSMwy9FjKvlUtyqsw-vwWtyKhoyJMPSY6eNMt_DtdcyuV5gFfcBHE1sxIw6a78aJ62rcwX4g8-RtaHsoE6DynkKGWAofqPiQ_-iH2aIVISBAx8exkwNfTasjqLrL7v2eeoXStOuTAgD5o"
            },
            {
                id: 3,
                type: "offres",
                name: "Modeste TOVIGNON",
                filiere: "Sécurité Informatique",
                niveau: "M2",
                matchScore: 89,
                description: "Besoin d'aide en Réseaux Informatiques ou en Cryptographie ? Je simplifie les concepts complexes pour vous aider à réussir vos examens.",
                subjects: ["Réseaux Informatiques", "Cybersécurité"],
                availability: "Week-end uniquement",
                format: "Les deux",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcKr29q9nyRd1QIFW7sQwibJRmRNyRxK-oyowHEhv8lgSic8pwc9iQ7vmL6TI49cQcPJ4zqh9nyGw7g3TcX9UdV0sQ0QdaojQ-68ozX5xb46QoomC4cFMtLrhuPse3eI6iQbv5JmLCzV9xEClXsmQpgudXnaCtyb6wFy9PVSb_qK6GQHRtgLZjudDAQpW8cgBWot1z1p1yb50_XYfSBfD7J2RU0Hyu65CpQCojGrxcxS1k5qg0YKfW34sbDP7m-l4bRbATUg7ZG3Q"
            },
            {
                id: 4,
                type: "offres",
                name: "Awa COULIBALY",
                filiere: "Web & Mobile",
                niveau: "L3",
                matchScore: 87,
                description: "React, Tailwind CSS et Flutter n'auront plus de secrets pour toi. On construit ton projet ensemble avec des bases solides.",
                subjects: ["Développement Web", "Python"],
                availability: "Flexible",
                format: "Les deux",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuClrStjK0ahoYutSyaj9Z7JcPFXrZpxTAV4flVTqqbpf9xY7HlJjBdzEFeAD5skKH28tEkJU6PTTK7DK6BZ95kM7ggwca6zcx_KPsbLa4Npt0spUcMgwUWaq256vbJwf8wD0td495CH4zfwFXqL3DQ9M-avrah5W1t_kfxJx8xWkMcGw-a3SmS4dM42vW7D3ba8OI4dYLsLwtnztwY_ELIof-lHiUzUBn_V2UwYZjPJpX_iLbtE-OrSWSogr74t_rwGGL3pAXkdV_A"
            },
            {
                id: 5,
                type: "offres",
                name: "Didier AMOU",
                filiere: "Génie Logiciel",
                niveau: "M1",
                matchScore: 85,
                description: "Ancien lauréat du concours d'algorithmique de l'IFRI. Je t'aide à comprendre la complexité, les graphes et le C++.",
                subjects: ["Algorithmique", "Java"],
                availability: "Mardi, Vendredi",
                format: "Présentiel",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQzyckewNt04Chns61wKBr1tRkIU3rm5TYfRrSsCVYWWCOGZaSHIXb2dJIYotDPwryhubeLHHwt7G0Ycj8tj1wWq7BUVaxK5WgJ3KIjxPWxJZeqh9vm-BJ0qe-Tp8gNFO6hTggugpq6t9y0qSIyRXCaH64k16eB9k1f-QxnlPmRS0Vpa_srFhqun7GKAyLf7eVaPOw4BE_0zgK9SbDaq7ZO02it4zorE-sgtajtFu4EQ31a4kwY_63DyXgvMWnZDntpm8Y1Uw_Yhg"
            },
            {
                id: 6,
                type: "offres",
                name: "Grace ADEWALE",
                filiere: "Génie Logiciel",
                niveau: "M2",
                matchScore: 82,
                description: "Certifiée Scrum Master. Je peux t'aider à organiser ton projet de fin d'études avec Agile, Trello, et le cahier des charges.",
                subjects: ["Gestion de Projet"],
                availability: "Lundi, Jeudi",
                format: "En ligne",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR3e7PCLCnqnxCN-GYRCsYeNezGlSf-hlNGeGlke1HuVLCLJQdokvzDVPius36gnAFWrQ_NbnZW8rwY69UquC5hNnA2P80AQVyz3lh7elVT8D5DHMNWvJPvaGeTepZ73dCCJw8QFQ24duXiCiP1Qa0mi-K5t2fUeKi6RuNgj6qW_CnyXn1kwxcSFxZz9dkkhilf0Iz78NVseNZdnzTjmYg6NLAwyOlHYH-yyv7i9pmWRAHbviO4hxOsPyTULeCwhCLOgUrA8Jjn3Q"
            },
            
            // DEMANDES (Mentees seeking help)
            {
                id: 11,
                type: "demandes",
                name: "Ablavi G.",
                filiere: "Génie Logiciel",
                niveau: "L2",
                matchScore: 87,
                description: "Je recherche un mentor pour m'aider à structurer mes projets d'application mobile en Dart et Flutter, ainsi qu'à réviser l'analyse algorithmique.",
                subjects: ["Algorithmique", "Développement Web"],
                availability: "Samedi matin",
                format: "Les deux",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB-MP5RDIm8Zgunzu5nrq1YCQInShYJH_hGcbu12T_GA9DTmA2jyhr6vMHEanrPgZXx-WIDVfj_R2Zwu-ORpnu2UMKjFr3nOdA1plSUWCB2CGpT44gvSSuN7PN4pgI7K2NmLRMI4UkCR7Tov7Y5HRVMBH1ASHizPHMY7WF5Tyjz_T18t0zpUYahiyDc-JaDZqXPxEBV2f9nPjIICTFiTGsI5jQQYozZ0LTsn0Xn4HkJgRToIc-4cUGhYUKNmU9F_ENEXmPSd2N9Is"
            },
            {
                id: 12,
                type: "demandes",
                name: "Euloge S.",
                filiere: "Intelligence Artificielle",
                niveau: "L1",
                matchScore: 76,
                description: "Nouvel étudiant en L1, j'ai des difficultés sur la syntaxe Python et l'algèbre linéaire appliquée à l'informatique. Un soutien serait super !",
                subjects: ["Python", "Algorithmique"],
                availability: "Mercredi soir",
                format: "En ligne",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZfGy-IPE-48rirtSjTy6p7R1arfGQ_rI4IgGlHTwJxSRqLma_qnpOjnBuTYK2bKllby1o-sSjkdEKBGNBpLKOgnPLhZzhoolSxyQ3k5HHGZSfn6atwLNjWx8rNhHnb3PcuwwPhJK3lfy2hZ4e2IvPLZ9rMIQXuy3Vd_0_0FluVQtnHY1VD8IRVJ_jRQE2jDPJXCgMmvBgpGEB-1AL8yfT4kGnVSQZC4lj_JmnqeNeo3hZu36fRyAmKwbfvSOPV5qFtPKAuZ8xjXk"
            },
            {
                id: 13,
                type: "demandes",
                name: "Conceptia B.",
                filiere: "Sécurité Informatique",
                niveau: "L3",
                matchScore: 91,
                description: "En préparation pour le projet de licence en sécurité, je cherche de l'aide sur la configuration de pare-feu et les vulnérabilités OWASP.",
                subjects: ["Cybersécurité", "Réseaux Informatiques"],
                availability: "Samedi, Dimanche",
                format: "Présentiel",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgY_BPpDnVTVvD5Snsr_jhGz5oBUtVtaiunmwG5dNT1_FqKXDS4Irk8SFhCK80baetNTMgVzHKqgHa8dq1ARdG5bvnZpNv-kjQ01H5TZ4O_9IfiATvSw5PavaDh0QxMiLu2UIh-4aXkwWjnesRrcypTzVka8-GK6blsEcUwSklOzzIfdjAMM62glgt_2VlXN7r-g1-gabcgA6nPJRapOnBjI416mpNwiSBFstjdtEDtBKCOEmKBrk5G-vQ5oq5Xc2V0HpCWvV5TqU"
            }
        ]);

        // Filter computed state
        const hasActiveFilters = computed(() => {
            return activeFilters.value.subject || 
                   activeFilters.value.format || 
                   activeFilters.value.filiere || 
                   activeFilters.value.level;
        });

        const filteredItems = computed(() => {
            return dbItems.value.filter(item => {
                // Filter by Tab (offres vs demandes)
                if (item.type !== currentTab.value) return false;

                // Filter by Search Query
                if (searchQuery.value) {
                    const query = searchQuery.value.toLowerCase().trim();
                    const matchesSearch = item.name.toLowerCase().includes(query) || 
                                          item.description.toLowerCase().includes(query) || 
                                          item.subjects.some(s => s.toLowerCase().includes(query));
                    if (!matchesSearch) return false;
                }

                // Filter by Subject
                if (activeFilters.value.subject && !item.subjects.includes(activeFilters.value.subject)) {
                    return false;
                }

                // Filter by Format
                if (activeFilters.value.format && item.format !== activeFilters.value.format && item.format !== 'Les deux') {
                    return false;
                }

                // Filter by Filiere
                if (activeFilters.value.filiere && item.filiere !== activeFilters.value.filiere) {
                    return false;
                }

                // Filter by Level
                if (activeFilters.value.level && item.niveau !== activeFilters.value.level) {
                    return false;
                }

                return true;
            });
        });

        // Pagination calculation
        const totalPages = computed(() => {
            return Math.ceil(filteredItems.value.length / itemsPerPage);
        });

        const paginatedItems = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return filteredItems.value.slice(start, end);
        });

        // Watch filters/tab and reset page
        watch([currentTab, searchQuery, activeFilters], () => {
            currentPage.value = 1;
        }, { deep: true });

        // Actions
        const toggleFilterMenu = (menu) => {
            if (openedMenu.value === menu) {
                openedMenu.value = null;
            } else {
                openedMenu.value = menu;
            }
        };

        const setFilter = (category, value) => {
            activeFilters.value[category] = value;
            openedMenu.value = null; // Close menu after setting
        };

        const clearAllFilters = () => {
            activeFilters.value.subject = null;
            activeFilters.value.format = null;
            activeFilters.value.filiere = null;
            activeFilters.value.level = null;
            openedMenu.value = null;
        };

        return {
            currentTab,
            searchQuery,
            currentPage,
            openedMenu,
            openedMenuLabel,
            activeFilters,
            filterChoices,
            hasActiveFilters,
            filteredItems,
            totalPages,
            paginatedItems,
            toggleFilterMenu,
            setFilter,
            clearAllFilters
        };
    }
}).mount('#app');
