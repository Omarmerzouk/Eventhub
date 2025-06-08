// Fonctions utilitaires générales
export const helpers = {
    // Formater une date
    formatDate: (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    },
    
    // Générer un ID aléatoire
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    },
    
    // Débounce pour limiter les appels de fonction
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Valider un email
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Nettoyer une chaîne de caractères
    sanitizeString: (str) => {
        return str.trim().replace(/[<>]/g, '');
    },
    
    // Formater un prix
    formatPrice: (price) => {
        if (price === 'Gratuit' || price === 'gratuit') return 'Gratuit';
        return price.toString().includes('€') ? price : `${price}€`;
    },
    
    // Capitaliser la première lettre
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    
    // Tronquer un texte
    truncate: (text, length = 100) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    }
};