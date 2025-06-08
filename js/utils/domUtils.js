// Utilitaires pour la manipulation du DOM
export const domUtils = {
    // Sélectionner un élément
    select: (selector) => document.querySelector(selector),
    
    // Sélectionner plusieurs éléments
    selectAll: (selector) => document.querySelectorAll(selector),
    
    // Créer un élément
    create: (tag, className = '', content = '') => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.innerHTML = content;
        return element;
    },
    
    // Ajouter une classe
    addClass: (element, className) => {
        if (element) element.classList.add(className);
    },
    
    // Supprimer une classe
    removeClass: (element, className) => {
        if (element) element.classList.remove(className);
    },
    
    // Basculer une classe
    toggleClass: (element, className) => {
        if (element) element.classList.toggle(className);
    },
    
    // Vérifier si un élément a une classe
    hasClass: (element, className) => {
        return element ? element.classList.contains(className) : false;
    },
    
    // Définir le contenu HTML
    setHTML: (element, html) => {
        if (element) element.innerHTML = html;
    },
    
    // Définir le contenu texte
    setText: (element, text) => {
        if (element) element.textContent = text;
    },
    
    // Obtenir la valeur d'un input
    getValue: (selector) => {
        const element = document.querySelector(selector);
        return element ? element.value : '';
    },
    
    // Définir la valeur d'un input
    setValue: (selector, value) => {
        const element = document.querySelector(selector);
        if (element) element.value = value;
    },
    
    // Afficher/masquer un élément
    show: (element) => {
        if (element) element.style.display = 'block';
    },
    
    hide: (element) => {
        if (element) element.style.display = 'none';
    },
    
    // Ajouter un écouteur d'événement
    on: (element, event, handler) => {
        if (element) element.addEventListener(event, handler);
    },
    
    // Supprimer un écouteur d'événement
    off: (element, event, handler) => {
        if (element) element.removeEventListener(event, handler);
    }
};