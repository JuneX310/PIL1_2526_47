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

        // Database items from Django Backend
        const dbItems = ref(window.DJANGO_DATA || []);

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
