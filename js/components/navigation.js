import { domUtils } from '../utils/domUtils.js';

// Gestion de la navigation
export class Navigation {
    constructor() {
        this.currentSection = 'accueil';
        this.init();
    }

    init() {
        this.bindEvents();
        this.showSection('accueil');
    }

    bindEvents() {
        // Gérer les clics sur les liens de navigation
        const navLinks = domUtils.selectAll('.nav-link');
        navLinks.forEach(link => {
            domUtils.on(link, 'click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('href').substring(1);
                this.showSection(sectionId);
            });
        });

        // Vérifier le fragment URL au chargement
        const hash = window.location.hash.substring(1);
        if (hash === 'evenements' || hash === 'apropos') {
            this.showSection(hash);
        }
    }

    showSection(sectionId) {
        // Cacher toutes les sections sauf evenements-accueil qui reste toujours sur la page d'accueil
        const sections = domUtils.selectAll('section');
        sections.forEach(section => {
            if (section.id === 'evenements-accueil') {
                domUtils.toggleClass(section, 'active', sectionId === 'accueil');
            } else {
                domUtils.removeClass(section, 'active');
            }
        });
        
        // Afficher la section demandée
        const targetSection = domUtils.select(`#${sectionId}`);
        if (targetSection) {
            domUtils.addClass(targetSection, 'active');
        }
        
        // Mettre à jour les liens de navigation
        const navLinks = domUtils.selectAll('.nav-link');
        navLinks.forEach(link => {
            domUtils.removeClass(link, 'active');
        });
        
        const activeLink = domUtils.select(`[href="#${sectionId}"]`);
        if (activeLink) {
            domUtils.addClass(activeLink, 'active');
        }

        this.currentSection = sectionId;
    }

    getCurrentSection() {
        return this.currentSection;
    }
}