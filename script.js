let filteredEvents = [...dbEvents]; // Initialise avec les données de la base
let currentEvent = null;
let isLoggedIn = false;
// Navigation
function showSection(sectionId) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === 'evenements-accueil') {
            // Garder evenements-accueil visible sur l'accueil et la page événements
            section.classList.toggle('active', sectionId === 'accueil' || sectionId === 'evenements');
        }
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Faire défiler jusqu'à la section si ce n'est pas l'accueil
        if (sectionId !== 'accueil') {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Mettre à jour les liens de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        link.classList.toggle('active', href === sectionId);
    });
}
// Gestion des clics sur les liens de navigation
document.addEventListener('DOMContentLoaded', function() {
    // Afficher la section d'accueil par défaut
    showSection('accueil');
    
    // Générer les événements
    generateEvents();
    generateHomeEvents();
    
    // Gérer les clics sur les liens de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
               history.pushState(null, '', `#${sectionId}`);
        });
    });

    // Vérifier le fragment URL au chargement
    const hash = window.location.hash.substring(1);
    if (hash === 'evenements' || hash === 'apropos') {
        showSection(hash);
    }
});

// Recherche d'événements
function searchEvents() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (query.trim()) {
        const eventKeywords = ['evenement', 'événement', 'event', 'conference', 'conférence', 'workshop', 'seminaire', 'séminaire', 'formation', 'networking'];
        const isEventRelated = eventKeywords.some(keyword => query.includes(keyword));
        
        filteredEvents = dbEvents.filter(event => 
            (event.titre || '').toLowerCase().includes(query) ||
            (event.lieu || '').toLowerCase().includes(query) ||
            (event.type || '').toLowerCase().includes(query)
        );
        
        generateEvents();
        
        if (isEventRelated || filteredEvents.length > 0) {
            showSection('evenements');
        }
        
        showToast(`${filteredEvents.length} événement(s) trouvé(s) pour "${query}"`);
    } else {
        showToast('Veuillez entrer un terme de recherche', 'error');
    }
}
// Génération des événements pour l'accueil (6 premiers)
function generateHomeEvents() {
    const grid = document.getElementById('homeEventsGrid');
    const homeEvents = events.slice(0, 6);
    
    grid.innerHTML = homeEvents.map(event => 
        `<div class="event-card" onclick="openEventModal(${event.id})">
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <div class="event-header">
                    <span class="event-type">${event.type}</span>
                    <span class="event-format ${event.format === 'Présentiel' ? 'format-presentiel' : 'format-enligne'}">
                        ${event.format}
                    </span>
                </div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-details">
                    <div class="event-detail">
                        <i class="fas fa-calendar"></i>
                        <span>${event.date}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-users"></i>
                        <span>${event.participants} participants</span>
                    </div>
                </div>
                <div class="event-footer">
                    <div class="event-rating">
                        <span>⭐</span>
                        <span>${event.rating}</span>
                        <span style="color: #6b7280; font-size: 14px;">(${event.reviews} avis)</span>
                    </div>
                    <div class="event-price">${event.price}</div>
                </div>
            </div>
        </div>`
    ).join('');
}

// Génération des cartes d'événements
function generateEvents() {
    const grid = document.getElementById('eventsGrid');
    const eventCount = document.getElementById('eventCount');
    
    eventCount.textContent = filteredEvents.length;
    
    grid.innerHTML = filteredEvents.map(event => 
        `<div class="event-card" onclick="openEventModal(${event.id})">
            <img src="${event.image || ''}" alt="${event.titre || ''}" class="event-image">
            <div class="event-content">
                <div class="event-header">
                    <span class="event-type">${event.type || ''}</span>
                    <span class="event-format ${event.format === 'Présentiel' ? 'format-presentiel' : 'format-enligne'}">
                        ${event.format || ''}
                    </span>
                </div>
                <h3 class="event-title">${event.titre || ''}</h3>
                <p class="event-description">${event.description || ''}</p>
                <div class="event-details">
                    <div class="event-detail">
                        <i class="fas fa-calendar"></i>
                        <span>${event.date || ''}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.lieu || ''}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-users"></i>
                        <span>${event.participants || '0'} participants</span>
                    </div>
                </div>
                <div class="event-footer">
                    <div class="event-rating">
                        <span>⭐</span>
                        <span>${event.rating || '0'}</span>
                        <span style="color: #6b7280; font-size: 14px;">(${event.reviews || '0'} avis)</span>
                    </div>
                    <div class="event-price">${event.prix == 0 ? 'Gratuit' : event.prix + '€'}</div>
                </div>
            </div>
        </div>`
    ).join('');
}


// Gestion des filtres
function toggleFilters() {
    const sidebar = document.getElementById('filtersSidebar');
    sidebar.classList.toggle('open');
}

function applyFilters() {
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]:checked');
    const selectedFilters = Array.from(checkboxes).map(cb => cb.value);
    
    if (selectedFilters.length === 0) {
        filteredEvents = [...dbEvents];
    } else {
        filteredEvents = dbEvents.filter(event => 
            selectedFilters.includes(event.lieu.split(', ')[1]) ||
            selectedFilters.includes(event.type) ||
            selectedFilters.includes(event.priceCategory)
        );
    }
    
    generateEvents();
    showToast(`Filtres appliqués: ${filteredEvents.length} événement(s) trouvé(s)`);
}

// Modals
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openLoginModal() {
    openModal('loginModal');
}

function openRegisterModal() {
    openModal('registerModal');
}

function openCreateEventModal() {
    if (!isLoggedIn) {
        showToast('Vous devez être connecté pour créer un événement', 'error');
        openLoginModal();
        return;
    }
    openModal('createEventModal');
}

function openCreateEventModal() {
    openModal('createEventModal');
}

// Fonction pour basculer les champs selon le format d'événement
function toggleLocationFields() {
    const formatRadios = document.querySelectorAll('input[name="format"]');
    const locationLinkLabel = document.getElementById('locationLinkLabel');
    const locationLinkInput = document.getElementById('locationLinkInput');
    const locationHelpText = document.getElementById('locationHelpText');
    
    let selectedFormat = '';
    formatRadios.forEach(radio => {
        if (radio.checked) {
            selectedFormat = radio.value;
        }
    });
    
    if (selectedFormat === 'Présentiel') {
        locationLinkLabel.textContent = 'Adresse complète *';
        locationLinkInput.placeholder = 'Adresse complète du lieu';
        locationHelpText.textContent = 'Indiquez l\'adresse complète où se déroulera l\'événement';
    } else if (selectedFormat === 'En ligne') {
        locationLinkLabel.textContent = 'Lien de connexion *';
        locationLinkInput.placeholder = 'https://meet.google.com/... ou https://zoom.us/...';
        locationHelpText.textContent = 'Indiquez le lien de connexion (Meet, Zoom, Teams, etc.)';
    }
}

function updateAuthState(loggedIn) {
    isLoggedIn = loggedIn;
    // Mettre à jour l'interface utilisateur selon l'état de connexion
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn && logoutBtn) {
        if (isLoggedIn) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
        }
    }
}

function logout() {
    updateAuthState(false);
    showToast('Déconnexion réussie!');
}

// Création d'événement
// Création d'événement
function createEvent(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newEvent = {
        id: events.length + 1,
        title: formData.get('title'),
        description: formData.get('description'),
        date: new Date(formData.get('dateTime')).toLocaleDateString('fr-FR'),
        location: `${formData.get('city')}, ${formData.get('country')}`,
        country: formData.get('country'),
        participants: Math.floor(Math.random() * 500) + 50,
        rating: (Math.random() * 1 + 4).toFixed(1),
        reviews: Math.floor(Math.random() * 100) + 20,
        price: formData.get('price') || 'Gratuit',
        priceCategory: formData.get('price') && formData.get('price') !== 'Gratuit' ? 'Payant' : 'Gratuit',
        organizer: 'Nouvel organisateur',
        type: formData.get('category'),
        category: formData.get('category'),
        format: formData.get('format'),
        image: formData.get('imageUrl') || 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80'
    };

    events.unshift(newEvent);
    filteredEvents = [...events];
    generateEvents();
    generateHomeEvents();
    closeModal('createEventModal');
    showToast(`Événement "${newEvent.title}" créé avec succès!`);
    
    // Réinitialiser le formulaire
    event.target.reset();
}

function openEventModal(eventId) {
    // Validation de l'ID
    if (!eventId || isNaN(eventId)) {
        showToast("ID d'événement invalide", 'error');
        return;
    }
    // Récupérer les détails de l'événement depuis la base de données via AJAX
    fetch(`get_event_details.php?id=${encodeURIComponent(eventId)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(event => {
            if (!event) {
                throw new Error("Événement non trouvé");
            }
            
            // Stockage sécurisé des données de l'événement
            currentEvent = event;
            
            // Échappement des données sensibles
            const safeTitle = escapeHtml(event.titre);
            const safeDescription = escapeHtml(event.description);
            const safeLieu = escapeHtml(event.lieu);
            const safeOrganizer = escapeHtml(event.organizer || 'EventHub');
            const safeSessionInfo = event.session_info ? escapeHtml(event.session_info) : '';
            const safeLocationLink = event.lien_localisation ? escapeHtml(event.lien_localisation) : '';
            
            // Construction du HTML des commentaires
            let commentsHtml = '';
            if (event.comments && Array.isArray(event.comments) && event.comments.length > 0) {
                commentsHtml += '<div style="margin-top: 30px;"><h4>Commentaires :</h4><ul>';
                event.comments.forEach(comment => {
                    commentsHtml += `<li style="margin-bottom: 10px; color: #374151;">🗨️ ${escapeHtml(comment)}</li>`;
                });
                commentsHtml += '</ul></div>';
            }

            // Affichage des informations de session si disponibles
            let sessionInfoHtml = '';
            if (safeSessionInfo) {
                sessionInfoHtml = `
                    <div style="margin-bottom: 20px; background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                        <h4 style="color: #1e40af; margin-bottom: 8px;"><i class="fas fa-list-ul"></i> Programme des sessions</h4>
                        <p style="color: #1e40af; margin: 0; white-space: pre-line;">${safeSessionInfo}</p>
                    </div>
                `;
            }

            // Affichage du lien/localisation selon le format
            let locationInfoHtml = '';
            if (safeLocationLink) {
                if (event.format === 'En ligne') {
                    locationInfoHtml = `
                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                            <i class="fas fa-link" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                            <a href="${safeLocationLink}" target="_blank" style="color: #2563eb; text-decoration: none;">${safeLocationLink}</a>
                        </div>
                    `;
                } else {
                    locationInfoHtml = `
                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                            <i class="fas fa-map-marker-alt" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                            <span>${safeLocationLink}</span>
                        </div>
                    `;
                }
            }

            // Affichage de la capacité si disponible
            let capacityHtml = '';
            if (event.capacite) {
                capacityHtml = `
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <i class="fas fa-user-friends" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                        <span>Capacité maximale: ${event.capacite} personnes</span>
                    </div>
                `;
            }
            
            // Mise à jour du contenu de la modal
            const modalContent = document.getElementById('eventModalContent');
            modalContent.innerHTML = `
                <input type="hidden" id="eventId" value="${eventId}">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div>
                        <img src="${event.image}" alt="${safeTitle}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
                        
                        <!-- Formulaire commentaire + note -->
                        <div style="margin-top: 20px; background: #f9fafb; padding: 15px; border-radius: 8px;">
                            <h4 style="margin-bottom: 10px;">Laissez un commentaire</h4>
                            <textarea id="comment" placeholder="Écrivez votre avis ici..." style="width: 100%; height: 80px; padding: 8px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc;"></textarea>
                            <select id="rating" style="width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc;">
                                <option value="5">5 ⭐⭐⭐⭐⭐</option>
                                <option value="4">4 ⭐⭐⭐⭐</option>
                                <option value="3">3 ⭐⭐⭐</option>
                                <option value="2">2 ⭐⭐</option>
                                <option value="1">1 ⭐</option>
                            </select>
                            <button onclick="submitComment()" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 5px;">Envoyer</button>
                            <div id="commentList" style="margin-top: 15px;">${commentsHtml}</div>
                        </div>
                    </div>
                    <div>
                        <h3 style="font-size: 24px; margin-bottom: 15px; color: #1f2937;">${safeTitle}</h3>
                        <p style="color: #6b7280; margin-bottom: 20px; line-height: 1.6;">${safeDescription}</p>
                        
                        ${sessionInfoHtml}
                        
                        <div style="margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <i class="fas fa-calendar" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                                <span>${event.date}</span>
                            </div>
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <i class="fas fa-map-marker-alt" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                                <span>${safeLieu}</span>
                            </div>
                            ${locationInfoHtml}
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <i class="fas fa-users" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                                <span>${event.participants} participants</span>
                            </div>
                            ${capacityHtml}
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <i class="fas fa-building" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                                <span>Organisé par ${safeOrganizer}</span>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: center; margin-bottom: 20px;">
                            <span style="color: #fbbf24; margin-right: 5px;">⭐</span>
                            <span style="font-weight: 600; font-size: 18px;">${event.rating || '4.5'}</span>
                            <span style="color: #6b7280; margin-left: 5px;">(${event.reviews || '0'} avis)</span>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                            <span style="background: ${event.format === 'Présentiel' ? '#10b981' : '#3b82f6'}; color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px;">
                                ${event.format}
                            </span>
                            <span style="background: #f3f4f6; color: #374151; padding: 6px 12px; border-radius: 6px; font-size: 14px;">
                                ${event.type}
                            </span>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px;">
                            <div style="font-size: 28px; font-weight: bold; color: #059669;">${event.prix == 0 ? 'Gratuit' : event.prix + '€'}</div>
                            <button onclick="reserveEvent()" class="btn-primary" style="padding: 12px 24px; font-size: 16px;">
                                Réserver ma place
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            openModal('eventModal');
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des détails de l'événement:", error);
            showToast(error.message || "Une erreur est survenue lors du chargement des détails.", 'error');
        });
}
// Fonction utilitaire pour échapper le HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&")
        .replace(/</g, "<")
        .replace(/>/g, ">")
        .replace(/"/g, """)
        .replace(/'/g, "&#039;");
}
    







function submitComment() {
    const commentText = document.getElementById("comment").value.trim();
    const rating = document.getElementById("rating").value;
    const commentList = document.getElementById("commentList");

    if (!commentText) {
        alert("Veuillez écrire un commentaire avant d'envoyer.");
        return;
    }

    if (commentText.length > 100) {
        alert("Le commentaire ne doit pas dépasser 100 caractères.");
        return;
    }

    if (!rating) {
        alert("Veuillez sélectionner une note.");
        return;
    }

    // Ajouter le commentaire au tableau de l'événement actuel
    if (!currentEvent.comments) currentEvent.comments = [];
    currentEvent.comments.push(`${commentText} - ${rating}⭐`);

    // Afficher le nouveau commentaire
    const commentElement = document.createElement("div");
    commentElement.style.marginTop = "8px";
    commentElement.style.padding = "8px";
    commentElement.style.background = "#e5e7eb";
    commentElement.style.borderRadius = "6px";
    commentElement.style.color = "#374151";
    commentElement.innerHTML = `🗨️ ${commentText} <span style="float:right;">${rating}⭐</span>`;
    commentList.appendChild(commentElement);

    // Réinitialiser le formulaire
    document.getElementById("comment").value = "";
    document.getElementById("rating").value = "";
}

// Réservation d'événement
function reserveEvent() {
    if (!currentEvent) return;

        if (!isLoggedIn) {
        showToast('Vous devez être connecté ou inscrit pour nous rejoindre', 'error');
        openLoginModal();
        return;
    }
    
    closeModal('eventModal');
    
if (currentEvent.prix == 0 || currentEvent.prix === 'Gratuit') {
     addNotification
            "Réservation confirmée",
            `Votre réservation pour l'événement "${currentEvent.titre}" a été confirmée.`
        // Pour les événements gratuits, confirmer directement sans passer par le paiement
        showToast(`Réservation confirmée pour l'événement : ${currentEvent.titre}`);
    } else {
        openPaymentModal();
    }
}

function openPaymentModal() {
    if (!currentEvent) return;
    
    document.getElementById('paymentEventTitle').textContent = currentEvent.title;
    document.getElementById('paymentPrice').textContent = currentEvent.price;
    
    openModal('paymentModal');
}

// Traitement du paiement
function processPayment(event) {
    event.preventDefault();
    
    // Simulation du traitement du paiement
    const formData = new FormData(event.target);
    const cardNumber = formData.get('cardNumber') || event.target.querySelector('input[placeholder*="1234"]').value;
    
    if (cardNumber.length < 16) {
        showToast('Numéro de carte invalide', 'error');
        return;
    }
    
    // Simulation d'un délai de traitement
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Traitement en cours...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeModal('paymentModal');
        showToast(`Paiement réussi! Réservation confirmée pour: ${currentEvent.title}`);
        
        // Réinitialiser le bouton
        submitBtn.textContent = 'Confirmer le paiement';
        submitBtn.disabled = false;
        
        // Réinitialiser le formulaire
        event.target.reset();
    }, 2000);
}

// Connexion et inscription
function login(event) {
    event.preventDefault();
    closeModal('loginModal');
    updateAuthState(true);
    showToast('Connexion réussie!');
}

function register(event) {
    event.preventDefault();
    closeModal('registerModal');
    updateAuthState(true);
    showToast('Inscription réussie!');
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Fermeture des modals en cliquant à l'extérieur
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Formatage automatique du numéro de carte
document.addEventListener('input', function(e) {
    if (e.target.placeholder && e.target.placeholder.includes('1234')) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
        if (formattedValue.length <= 19) {
            e.target.value = formattedValue;
        }
    }
    
    if (e.target.placeholder && e.target.placeholder.includes('MM/AA')) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    }
});
// Navigation au clavier (pour la recherche, qui est maintenant désactivée)
// Gestion des notifications
let notifications = [];
let notificationCount = 0;
function toggleNotifications() {
    const dropdown = document.querySelector('.notification-dropdown');
    dropdown.classList.toggle('show');
}
function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    badge.textContent = notificationCount;
    badge.style.display = notificationCount > 0 ? 'block' : 'none';
}
function addNotification(title, message) {
    notifications.unshift({ title, message, date: new Date() });
    notificationCount++;
    updateNotificationBadge();
    updateNotificationDropdown();
}
function updateNotificationDropdown() {
    const dropdown = document.querySelector('.notification-dropdown');
    if (notifications.length === 0) {
        dropdown.innerHTML = `
            <div class="notification-item">
                <div class="notification-title">Aucune notification</div>
                <div class="notification-message">Vous n'avez pas de réservations confirmées pour le moment.</div>
            </div>
        `;
    } else {
        dropdown.innerHTML = notifications.map(notif => `
            <div class="notification-item">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-date">${notif.date.toLocaleDateString()}</div>
            </div>
        `).join('');
    }
}
// Fermer le dropdown quand on clique en dehors
document.addEventListener('click', function(event) {
    if (!event.target.closest('.notification-bell')) {
        const dropdown = document.querySelector('.notification-dropdown');
        dropdown.classList.remove('show');
    }
});
// Ajouter une notification lors d'une réservation
function reserveEvent() {
    if (!currentEvent) return;
    
    if (currentEvent.prix == 0 || currentEvent.prix === 'Gratuit') {
        addNotification(
            'Réservation confirmée',
            `Votre réservation pour "${currentEvent.titre}" a été confirmée.`
        );
        showToast(`Réservation confirmée pour l'événement : ${currentEvent.titre}`);
    } else {
        openPaymentModal();
    }
    closeModal('eventModal');
}
// Ajouter une notification après un paiement réussi
function processPayment(event) {
    event.preventDefault();
    
    setTimeout(() => {
        closeModal('paymentModal');
        addNotification(
            'Paiement confirmé',
            `Votre paiement pour "${currentEvent.titre}" a été traité avec succès.`
        );
        showToast(`Paiement réussi! Réservation confirmée pour: ${currentEvent.titre}`);
    }, 2000);
}
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.id === 'searchInput') {
        searchEvents(); // Appelle la fonction searchEvents (maintenant commentée/désactivée)
    }
});