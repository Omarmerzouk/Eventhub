import { domUtils } from '../utils/domUtils.js';
import { eventTemplates } from '../templates/eventTemplates.js';

// Gestionnaire des modals
export class ModalManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Fermeture des modals en cliquant à l'extérieur
        domUtils.on(window, 'click', (event) => {
            const modals = domUtils.selectAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    // Ouvrir un modal
    openModal(modalId) {
        const modal = domUtils.select(`#${modalId}`);
        domUtils.show(modal);
    }

    // Fermer un modal
    closeModal(modalId) {
        const modal = domUtils.select(`#${modalId}`);
        domUtils.hide(modal);
    }

    // Ouvrir le modal de connexion
    openLoginModal() {
        this.openModal('loginModal');
    }

    // Ouvrir le modal d'inscription
    openRegisterModal() {
        this.openModal('registerModal');
    }

    // Ouvrir le modal de création d'événement
    openCreateEventModal() {
        this.openModal('createEventModal');
    }

    // Ouvrir le modal d'événement avec les détails
    openEventModal(event) {
        const modalContent = domUtils.select('#eventModalContent');
        const html = eventTemplates.eventModal(event);
        domUtils.setHTML(modalContent, html);
        this.openModal('eventModal');
    }

    // Ouvrir le modal de paiement
    openPaymentModal(event) {
        if (!event) return;
        
        domUtils.setText(domUtils.select('#paymentEventTitle'), event.title);
        domUtils.setText(domUtils.select('#paymentPrice'), event.price);
        
        this.openModal('paymentModal');
    }

    // Réinitialiser un formulaire dans un modal
    resetForm(modalId) {
        const modal = domUtils.select(`#${modalId}`);
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}