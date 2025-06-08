import { domUtils } from '../utils/domUtils.js';

// Gestionnaire des notifications toast
export class ToastManager {
    constructor() {
        this.toastElement = domUtils.select('#toast');
    }

    // Afficher une notification
    show(message, type = 'success') {
        if (!this.toastElement) return;

        domUtils.setText(this.toastElement, message);
        this.toastElement.className = `toast ${type}`;
        domUtils.addClass(this.toastElement, 'show');
        
        setTimeout(() => {
            domUtils.removeClass(this.toastElement, 'show');
        }, 3000);
    }

    // Afficher une notification de succès
    success(message) {
        this.show(message, 'success');
    }

    // Afficher une notification d'erreur
    error(message) {
        this.show(message, 'error');
    }

    // Afficher une notification d'information
    info(message) {
        this.show(message, 'info');
    }
}