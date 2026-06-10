document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!submitBtn) return;
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="animate-spin material-symbols-outlined">sync</span>
                Envoi en cours...
            `;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.classList.remove('bg-primary');
                submitBtn.classList.add('bg-succes');
                submitBtn.innerHTML = `
                    <span class="material-symbols-outlined">check_circle</span>
                    Lien envoyé !
                `;
                
                // Reset after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('bg-succes');
                    submitBtn.classList.add('bg-primary');
                    submitBtn.innerHTML = originalContent;
                }, 3000);
            }, 1500);
        });
    }
});
