import { domUtils } from '../utils/domUtils.js';
import { helpers } from '../utils/helpers.js';

// Gestionnaire des formulaires
export class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Formatage automatique du numéro de carte
        domUtils.on(document, 'input', (e) => {
            if (e.target.placeholder && e.target.placeholder.includes('1234')) {
                this.formatCardNumber(e.target);
            }
            
            if (e.target.placeholder && e.target.placeholder.includes('MM/AA')) {
                this.formatExpiryDate(e.target);
            }
        });

        // Navigation au clavier
        domUtils.on(document, 'keydown', (e) => {
            if (e.key === 'Enter' && e.target.id === 'searchInput') {
                window.searchEvents();
            }
        });
    }

    // Formater le numéro de carte
    formatCardNumber(input) {
        let value = input.value.replace(/\s/g, '');
        let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
        if (formattedValue.length <= 19) {
            input.value = formattedValue;
        }
    }

    // Formater la date d'expiration
    formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value;
    }

    // Valider un formulaire de création d'événement
    validateEventForm(formData) {
        const errors = [];

        if (!formData.get('title')?.trim()) {
            errors.push('Le titre est requis');
        }

        if (!formData.get('description')?.trim()) {
            errors.push('La description est requise');
        }

        if (!formData.get('category')) {
            errors.push('La catégorie est requise');
        }

        if (!formData.get('dateTime')) {
            errors.push('La date et heure sont requises');
        }

        if (!formData.get('city')?.trim()) {
            errors.push('La ville est requise');
        }

        if (!formData.get('country')?.trim()) {
            errors.push('Le pays est requis');
        }

        if (!formData.get('format')) {
            errors.push('Le format est requis');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Valider un formulaire de paiement
    validatePaymentForm(formData) {
        const errors = [];
        const cardNumber = formData.get('cardNumber') || '';

        if (cardNumber.replace(/\s/g, '').length < 16) {
            errors.push('Numéro de carte invalide');
        }

        if (!formData.get('expiryDate')) {
            errors.push('Date d\'expiration requise');
        }

        if (!formData.get('cvv') || formData.get('cvv').length < 3) {
            errors.push('CVV invalide');
        }

        if (!formData.get('cardName')?.trim()) {
            errors.push('Nom sur la carte requis');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Extraire les données d'un formulaire
    extractFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = helpers.sanitizeString(value);
        }
        
        return data;
    }
}