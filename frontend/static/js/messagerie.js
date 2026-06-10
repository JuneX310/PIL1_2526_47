const { createApp, ref, computed, onMounted, nextTick } = Vue;

const app = createApp({
    setup() {
        const conversations = ref([]);
        const messages = ref([]);
        const activeConversation = ref(null);
        const searchQuery = ref('');
        const newMessage = ref('');
        const isSending = ref(false);
        const messagesContainer = ref(null);
        
        const getCookie = (name) => {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };

        const fetchConversations = async () => {
            try {
                const response = await fetch('/profiles/api/conversations/');
                if (response.ok) {
                    const data = await response.json();
                    
                    // Comparer pour éviter de réécrire la liste si rien n'a changé
                    if (JSON.stringify(conversations.value) !== JSON.stringify(data.conversations)) {
                        conversations.value = data.conversations;
                        
                        // Keep active conversation reference in sync with background updates
                        if (activeConversation.value) {
                            const updatedActive = conversations.value.find(c => c.id === activeConversation.value.id);
                            if (updatedActive) {
                                activeConversation.value.last_message = updatedActive.last_message;
                                activeConversation.value.time = updatedActive.time;
                                activeConversation.value.updated_at = updatedActive.updated_at;
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Erreur de chargement des conversations", error);
            }
        };

        const fetchMessages = async (conversationId) => {
            try {
                const response = await fetch(`/profiles/api/messages/${conversationId}/`);
                if (response.ok) {
                    const data = await response.json();
                    
                    // Comparer pour éviter de clignoter ou de scroller si aucun nouveau message n'est reçu
                    if (JSON.stringify(messages.value) !== JSON.stringify(data.messages)) {
                        messages.value = data.messages;
                        scrollToBottom();
                    }
                }
            } catch (error) {
                console.error("Erreur de chargement des messages", error);
            }
        };

        const selectConversation = (conv) => {
            activeConversation.value = conv;
            conv.unread_count = 0; // Clear unread count locally for instant feedback
            fetchMessages(conv.id);
        };

        const sendMessage = async () => {
            if (!newMessage.value.trim() || !activeConversation.value) return;
            
            isSending.value = true;
            try {
                const csrfToken = getCookie('csrftoken') || document.getElementById('csrf_token_django')?.value;
                const response = await fetch('/profiles/api/envoyer-message/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    body: JSON.stringify({
                        destinataire_id: activeConversation.value.other_user.id,
                        contenu: newMessage.value
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    // Ajouter le message localement pour un feedback instantané
                    messages.value.push({
                        id: data.message_id,
                        contenu: newMessage.value,
                        is_me: true,
                        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    });
                    
                    // Mettre à jour la conversation dans la liste
                    activeConversation.value.last_message = newMessage.value;
                    activeConversation.value.time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    activeConversation.value.updated_at = new Date().toISOString();
                    
                    newMessage.value = '';
                    scrollToBottom();
                }
            } catch (error) {
                console.error("Erreur lors de l'envoi", error);
            } finally {
                isSending.value = false;
            }
        };

        const scrollToBottom = () => {
            nextTick(() => {
                if (messagesContainer.value) {
                    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
                }
                const fallbackContainer = document.getElementById('chat-messages');
                if (fallbackContainer) {
                    fallbackContainer.scrollTop = fallbackContainer.scrollHeight;
                }
            });
        };

        const filteredConversations = computed(() => {
            const query = searchQuery.value.toLowerCase().trim();
            let list = conversations.value;
            if (query) {
                list = conversations.value.filter(conv => 
                    conv.other_user.name.toLowerCase().includes(query) ||
                    conv.other_user.filiere.toLowerCase().includes(query)
                );
            }
            // Sort by updated_at descending so the most recently active conversation is at the top
            return [...list].sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
        });

        onMounted(async () => {
            await fetchConversations();
            
            // Check URL query parameters for auto-selecting a conversation/chat
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get('user_id');
            const convId = urlParams.get('conv_id');
            
            if (convId) {
                const conv = conversations.value.find(c => c.id == convId);
                if (conv) {
                    selectConversation(conv);
                }
            } else if (userId) {
                const conv = conversations.value.find(c => c.other_user.id == userId);
                if (conv) {
                    selectConversation(conv);
                }
            }
            
            // Polling dynamique toutes les 2 secondes (presque instantané)
            setInterval(() => {
                if (activeConversation.value) {
                    fetchMessages(activeConversation.value.id);
                }
                fetchConversations();
            }, 2000);
        });

        return {
            conversations,
            messages,
            activeConversation,
            searchQuery,
            newMessage,
            isSending,
            messagesContainer,
            filteredConversations,
            selectConversation,
            sendMessage
        };
    }
});

app.config.errorHandler = (err, instance, info) => {
    console.error("Vue Error:", err, info);
    const errDiv = document.createElement('div');
    errDiv.style = "position:fixed;top:0;left:0;right:0;background:red;color:white;padding:20px;z-index:99999;font-family:monospace;white-space:pre-wrap;";
    errDiv.textContent = `Vue Error: ${err.message}\nInfo: ${info}\nStack: ${err.stack}`;
    document.body.appendChild(errDiv);
};

window.addEventListener('error', (e) => {
    const errDiv = document.createElement('div');
    errDiv.style = "position:fixed;top:0;left:0;right:0;background:darkred;color:white;padding:20px;z-index:99999;font-family:monospace;white-space:pre-wrap;";
    errDiv.textContent = `Global Error: ${e.message}\nLine: ${e.lineno}, Col: ${e.colno}\nFile: ${e.filename}\nStack: ${e.error ? e.error.stack : ''}`;
    document.body.appendChild(errDiv);
});

try {
    app.mount('#app');
} catch (e) {
    const errDiv = document.createElement('div');
    errDiv.style = "position:fixed;top:0;left:0;right:0;background:orange;color:white;padding:20px;z-index:99999;font-family:monospace;white-space:pre-wrap;";
    errDiv.textContent = `Mount Error: ${e.message}\nStack: ${e.stack}`;
    document.body.appendChild(errDiv);
}
