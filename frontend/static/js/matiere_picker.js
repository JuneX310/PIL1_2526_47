/**
 * MatierePicker — Composant dropdown de sélection de matières
 * Réutilisable partout dans le projet (inscription, modifier_profil, publier)
 *
 * Usage :
 *   const picker = new MatierePicker({
 *       triggerEl:   document.getElementById('mon-bouton'),
 *       selectedList: myArray,           // tableau de strings (modifié en place)
 *       onChange:    (list) => {},        // callback appelé à chaque changement
 *       accentColor: 'strength' | 'weakness' | 'subject'  // couleur du thème
 *   });
 */

class MatierePicker {
    constructor({ triggerEl, selectedList, onChange, accentColor = 'subject' }) {
        this.triggerEl    = triggerEl;
        this.selectedList = selectedList; // référence au tableau externe
        this.onChange     = onChange || (() => {});
        this.accentColor  = accentColor;
        this.isOpen       = false;
        this.searchQuery  = '';

        // Couleurs selon le contexte
        this.colors = {
            subject:  { bg: 'mp-bg-subject',  tag: 'mp-tag-subject',  chk: 'mp-chk-subject'  },
            strength: { bg: 'mp-bg-strength', tag: 'mp-tag-strength', chk: 'mp-chk-strength' },
            weakness: { bg: 'mp-bg-weakness', tag: 'mp-tag-weakness', chk: 'mp-chk-weakness' },
        };

        this._buildDropdown();
        this._bindEvents();
    }

    _buildDropdown() {
        // Wrapper positionné relativement
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'mp-wrapper';
        this.triggerEl.parentNode.insertBefore(this.wrapper, this.triggerEl);
        this.wrapper.appendChild(this.triggerEl);

        // Panel dropdown
        this.panel = document.createElement('div');
        this.panel.className = 'mp-panel hidden';
        this.panel.innerHTML = `
            <div class="mp-search-wrap">
                <span class="material-symbols-outlined mp-search-icon">search</span>
                <input class="mp-search-input" type="text" placeholder="Rechercher une matière…" autocomplete="off"/>
            </div>
            <div class="mp-list"></div>
            <div class="mp-footer">
                <span class="mp-count-label"></span>
                <button class="mp-done-btn" type="button">Valider ✓</button>
            </div>
        `;
        this.wrapper.appendChild(this.panel);

        this.searchInput = this.panel.querySelector('.mp-search-input');
        this.listEl      = this.panel.querySelector('.mp-list');
        this.countLabel  = this.panel.querySelector('.mp-count-label');
        this.doneBtn     = this.panel.querySelector('.mp-done-btn');
    }

    _bindEvents() {
        // Ouvrir/fermer sur clic du trigger
        this.triggerEl.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle();
        });

        // Fermer en cliquant ailleurs
        document.addEventListener('click', (e) => {
            if (!this.wrapper.contains(e.target)) this.close();
        });

        // Recherche live
        this.searchInput.addEventListener('input', () => {
            this.searchQuery = this.searchInput.value.toLowerCase();
            this._renderList();
        });

        // Bouton Valider
        this.doneBtn.addEventListener('click', () => this.close());
    }

    _renderList() {
        const allMatieres = window.MATIERES_IFRI_L1 || [];
        const query = this.searchQuery;

        // Groupement par semestre
        const grouped = { 1: [], 2: [] };
        allMatieres.forEach(m => {
            if (!query || m.nom.toLowerCase().includes(query)) {
                grouped[m.semestre] = grouped[m.semestre] || [];
                grouped[m.semestre].push(m);
            }
        });

        this.listEl.innerHTML = '';

        [1, 2].forEach(sem => {
            const items = grouped[sem] || [];
            if (items.length === 0) return;

            const groupHeader = document.createElement('div');
            groupHeader.className = 'mp-group-header';
            groupHeader.textContent = `Semestre ${sem}`;
            this.listEl.appendChild(groupHeader);

            items.forEach(m => {
                const isChecked = this.selectedList.includes(m.nom);
                const item = document.createElement('label');
                item.className = `mp-item ${isChecked ? 'mp-item-checked' : ''}`;
                item.innerHTML = `
                    <input type="checkbox" class="mp-checkbox ${this.colors[this.accentColor].chk}" ${isChecked ? 'checked' : ''} value="${m.nom}"/>
                    <span class="mp-item-name">${m.nom}</span>
                `;
                const checkbox = item.querySelector('input');
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        if (!this.selectedList.includes(m.nom)) {
                            this.selectedList.push(m.nom);
                        }
                    } else {
                        const idx = this.selectedList.indexOf(m.nom);
                        if (idx > -1) this.selectedList.splice(idx, 1);
                    }
                    item.classList.toggle('mp-item-checked', checkbox.checked);
                    this._updateCount();
                    this.onChange(this.selectedList);
                });
                this.listEl.appendChild(item);
            });
        });

        this._updateCount();
    }

    _updateCount() {
        const n = this.selectedList.length;
        this.countLabel.textContent = n === 0 ? 'Aucune sélection' : `${n} matière${n > 1 ? 's' : ''} sélectionnée${n > 1 ? 's' : ''}`;
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.panel.classList.remove('hidden');
        this.searchInput.value = '';
        this.searchQuery = '';
        this._renderList();
        // Animation
        requestAnimationFrame(() => this.panel.classList.add('mp-panel-visible'));
        this.searchInput.focus();
    }

    close() {
        this.isOpen = false;
        this.panel.classList.remove('mp-panel-visible');
        setTimeout(() => this.panel.classList.add('hidden'), 180);
    }
}

// Export global
if (typeof window !== 'undefined') {
    window.MatierePicker = MatierePicker;
}
