import { Navigation } from './components/navigation.js';
import { EventManager } from './components/eventManager.js';
import { ModalManager } from './components/modalManager.js';
import { ToastManager } from './components/toastManager.js';
import { FormHandler } from './components/formHandler.js';
import { domUtils } from './utils/domUtils.js';

// Application principale
class EventHubApp {
    constructor() {
        this.navigation = new Navigation();
        this.eventManager = new EventManager();
        this.modalManager = new ModalManager();
        this.toastManager = new ToastManager();
        this.formHandler = new FormHandler();
        this.isLoggedIn = false;
        
        this.init();
    }

    init() {
        this.bindGlobalEvents();
        this.generateInitialEvents();
        this.exposeGlobalFunctions();
    }

    bindGlobalEvents() {
        // Événements globaux de l'application
        domUtils.on(document, 'DOMContentLoaded', () => {
            this.generateInitialEvents();
        });
    }

    generateInitialEvents() {
        this.eventManager.generateEvents();
        this.eventManager.generateHomeEvents();
    }

    exposeGlobalFunctions() {
        // Exposer les fonctions nécessaires globalement pour les onclick dans le HTML
        window.showSection = (sectionId) => this.navigation.showSection(sectionId);
        window.searchEvents = () => this.searchEvents();
        window.toggleFilters = () => this.toggleFilters();
        window.applyFilters = () => this.applyFilters();
        window.openLoginModal = () => this.modalManager.openLoginModal();
        window.openRegisterModal = () => this.modalManager.openRegisterModal();
        window.openCreateEventModal = () => this.openCreateEventModal();
        window.openEventModal = (eventId) => this.openEventModal(eventId);
        window.closeModal = (modalId) => this.modalManager.closeModal(modalId);
        window.createEvent = (event) => this.createEvent(event);
        window.reserveEvent = () => this.reserveEvent();
        window.processPayment = (event) => this.processPayment(event);
        window.submitComment = () => this.submitComment();
        window.login = (event) => this.login(event);
        window.register = (event) => this.register(event);
        window.logout = () => this.logout();
    }

    // Recherche d'événements
    searchEvents() {
        const query = domUtils.getValue('#searchInput');
        const result = this.eventManager.searchEvents(query);
        
        if (!result.success) {
            this.toastManager.error(result.message);
            return;
        }

        if (result.isEventRelated) {
            this.navigation.showSection('evenements');
        }
        
        this.toastManager.success(`${result.count} événement(s) trouvé(s) pour "${result.query}"`);
    }

    // Basculer l'affichage des filtres
    toggleFilters() {
        const sidebar = domUtils.select('#filtersSidebar');
        domUtils.toggleClass(sidebar, 'open');
    }

    // Appliquer les filtres
    applyFilters() {
        const count = this.eventManager.applyFilters();
        this.toastManager.success(`Filtres appliqués: ${count} événement(s) trouvé(s)`);
    }

    // Ouvrir le modal de création d'événement
    openCreateEventModal() {
        if (!this.isLoggedIn) {
            this.toastManager.error('Vous devez être connecté pour créer un événement');
            this.modalManager.openLoginModal();
            return;
        }
        this.modalManager.openCreateEventModal();
    }

    // Ouvrir le modal d'événement
    openEventModal(eventId) {
        const event = this.eventManager.setCurrentEvent(eventId);
        if (!event) return;
        
        this.modalManager.openEventModal(event);
    }

    // Créer un événement
    createEvent(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const validation = this.formHandler.validateEventForm(formData);
        
        if (!validation.isValid) {
            this.toastManager.error(validation.errors.join(', '));
            return;
        }

        const eventData = this.formHandler.extractFormData(event.target);
        const newEvent = this.eventManager.addEvent(eventData);
        
        this.modalManager.closeModal('createEventModal');
        this.modalManager.resetForm('createEventModal');
        this.toastManager.success(`Événement "${newEvent.title}" créé avec succès!`);
    }

    // Réserver un événement
    reserveEvent() {
        const currentEvent = this.eventManager.getCurrentEvent();
        if (!currentEvent) return;
        
        this.modalManager.closeModal('eventModal');
        
        if (currentEvent.price === 'Gratuit') {
            this.toastManager.success(`Réservation confirmée pour: ${currentEvent.title}`);
        } else {
            this.modalManager.openPaymentModal(currentEvent);
        }
    }

    // Traiter le paiement
    processPayment(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const validation = this.formHandler.validatePaymentForm(formData);
        
        if (!validation.isValid) {
            this.toastManager.error(validation.errors.join(', '));
            return;
        }
        
        const submitBtn = event.target.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Traitement en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            const currentEvent = this.eventManager.getCurrentEvent();
            this.modalManager.closeModal('paymentModal');
            this.toastManager.success(`Paiement réussi! Réservation confirmée pour: ${currentEvent.title}`);
            
            submitBtn.textContent = 'Confirmer le paiement';
            submitBtn.disabled = false;
            event.target.reset();
        }, 2000);
    }

    // Soumettre un commentaire
    submitComment() {
        const commentText = domUtils.getValue('#comment');
        const rating = domUtils.getValue('#rating');
        const eventId = domUtils.getValue('#eventId');

        if (!commentText.trim()) {
            this.toastManager.error('Veuillez écrire un commentaire avant d\'envoyer.');
            return;
        }

        if (commentText.length > 100) {
            this.toastManager.error('Le commentaire ne doit pas dépasser 100 caractères.');
            return;
        }

        if (!rating) {
            this.toastManager.error('Veuillez sélectionner une note.');
            return;
        }

        const success = this.eventManager.addComment(parseInt(eventId), commentText, rating);
        if (!success) {
            this.toastManager.error('Erreur lors de l\'ajout du commentaire.');
            return;
        }

        // Afficher le nouveau commentaire
        const commentList = domUtils.select('#commentList');
        const commentElement = domUtils.create('div', '', `🗨️ ${commentText} <span style="float:right;">${rating}⭐</span>`);
        commentElement.style.marginTop = '8px';
        commentElement.style.padding = '8px';
        commentElement.style.background = '#e5e7eb';
        commentElement.style.borderRadius = '6px';
        commentElement.style.color = '#374151';
        commentList.appendChild(commentElement);

        // Réinitialiser le formulaire
        domUtils.setValue('#comment', '');
        domUtils.setValue('#rating', '');
    }

    // Connexion
    login(event) {
        event.preventDefault();
        this.modalManager.closeModal('loginModal');
        this.updateAuthState(true);
        this.toastManager.success('Connexion réussie!');
    }

    // Inscription
    register(event) {
        event.preventDefault();
        this.modalManager.closeModal('registerModal');
        this.updateAuthState(true);
        this.toastManager.success('Inscription réussie!');
    }

    // Déconnexion
    logout() {
        this.updateAuthState(false);
        this.toastManager.success('Déconnexion réussie!');
    }

    // Mettre à jour l'état d'authentification
    updateAuthState(loggedIn) {
        this.isLoggedIn = loggedIn;
        // Mettre à jour l'interface utilisateur selon l'état de connexion
        const loginBtn = domUtils.select('#loginBtn');
        const logoutBtn = domUtils.select('#logoutBtn');
        
        if (loginBtn && logoutBtn) {
            if (this.isLoggedIn) {
                domUtils.hide(loginBtn);
                domUtils.show(logoutBtn);
            } else {
                domUtils.show(loginBtn);
                domUtils.hide(logoutBtn);
            }
        }
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    new EventHubApp();
});