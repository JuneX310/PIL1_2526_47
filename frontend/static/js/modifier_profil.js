document.addEventListener('DOMContentLoaded', () => {
    // Micro-interaction for availability grid
    document.querySelectorAll('.grid div[title]').forEach(slot => {
        slot.addEventListener('click', function() {
            if (this.classList.contains('bg-primary')) {
                this.classList.remove('bg-primary');
                this.classList.add('bg-surface-container-low', 'border', 'border-outline-variant');
            } else {
                this.classList.add('bg-primary');
                this.classList.remove('bg-surface-container-low', 'border', 'border-outline-variant');
            }
        });
    });
});
