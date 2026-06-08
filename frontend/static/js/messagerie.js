document.addEventListener('DOMContentLoaded', () => {
    // Micro-interaction for messaging list
    const convItems = document.querySelectorAll('.flex-1.overflow-y-auto > div');
    convItems.forEach(item => {
        item.addEventListener('click', () => {
            convItems.forEach(i => {
                i.classList.remove('bg-surface-container', 'border-l-4', 'border-primary');
                i.classList.add('hover:bg-surface-fond');
            });
            item.classList.add('bg-surface-container', 'border-l-4', 'border-primary');
            item.classList.remove('hover:bg-surface-fond');
        });
    });

    // Simple scroll to bottom of chat
    const chatWindow = document.getElementById('chat-messages');
    if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Add a slight hover animation to the send button
    const sendBtn = document.querySelector('button[type="submit"] .material-symbols-outlined');
    if (sendBtn) {
        const parentBtn = sendBtn.closest('button');
        if (parentBtn) {
            parentBtn.addEventListener('mouseenter', () => {
                sendBtn.style.transform = 'translateX(2px) translateY(-2px)';
                sendBtn.style.transition = 'transform 0.2s ease';
            });
            parentBtn.addEventListener('mouseleave', () => {
                sendBtn.style.transform = 'none';
            });
        }
    }
});
