import { events } from '../data/events.js';
import { eventTemplates } from '../templates/eventTemplates.js';
import { domUtils } from '../utils/domUtils.js';
import { helpers } from '../utils/helpers.js';

// Gestionnaire des événements
export class EventManager {
    constructor() {
        this.events = [...events];
        this.filteredEvents = [...events];
        this.currentEvent = null;
    }

    // Générer les événements pour l'accueil (6 premiers)
    generateHomeEvents() {
        const grid = domUtils.select('#homeEventsGrid');
        const homeEvents = this.events.slice(0, 6);
        
        const html = homeEvents.map(event => eventTemplates.eventCard(event)).join('');
        domUtils.setHTML(grid, html);
    }

    // Générer toutes les cartes d'événements
    generateEvents() {
        const grid = domUtils.select('#eventsGrid');
        const eventCount = domUtils.select('#eventCount');
        
        domUtils.setText(eventCount, this.filteredEvents.length);
        
        const html = this.filteredEvents.map(event => eventTemplates.eventCard(event)).join('');
        domUtils.setHTML(grid, html);
    }

    // Rechercher des événements
    searchEvents(query) {
        if (!query.trim()) {
            return { success: false, message: 'Veuillez entrer un terme de recherche' };
        }

        const lowerQuery = query.toLowerCase();
        const eventKeywords = ['evenement', 'événement', 'event', 'conference', 'conférence', 'workshop', 'seminaire', 'séminaire', 'formation', 'networking'];
        const isEventRelated = eventKeywords.some(keyword => lowerQuery.includes(keyword));
        
        this.filteredEvents = this.events.filter(event => 
            event.title.toLowerCase().includes(lowerQuery) ||
            event.location.toLowerCase().includes(lowerQuery) ||
            event.country.toLowerCase().includes(lowerQuery) ||
            event.type.toLowerCase().includes(lowerQuery) ||
            event.description.toLowerCase().includes(lowerQuery)
        );
        
        this.generateEvents();
        
        return {
            success: true,
            isEventRelated: isEventRelated || this.filteredEvents.length > 0,
            count: this.filteredEvents.length,
            query: query
        };
    }

    // Appliquer les filtres
    applyFilters() {
        const checkboxes = domUtils.selectAll('.filter-group input[type="checkbox"]:checked');
        const selectedFilters = Array.from(checkboxes).map(cb => cb.value);
        
        if (selectedFilters.length === 0) {
            this.filteredEvents = [...this.events];
        } else {
            this.filteredEvents = this.events.filter(event => 
                selectedFilters.includes(event.country) ||
                selectedFilters.includes(event.type) ||
                selectedFilters.includes(event.priceCategory)
            );
        }
        
        this.generateEvents();
        return this.filteredEvents.length;
    }

    // Obtenir un événement par ID
    getEventById(eventId) {
        return this.events.find(e => e.id === parseInt(eventId));
    }

    // Ajouter un nouvel événement
    addEvent(eventData) {
        const newEvent = {
            id: this.events.length + 1,
            title: eventData.title,
            description: eventData.description,
            date: helpers.formatDate(eventData.dateTime),
            location: `${eventData.city}, ${eventData.country}`,
            country: eventData.country,
            participants: Math.floor(Math.random() * 500) + 50,
            rating: (Math.random() * 1 + 4).toFixed(1),
            reviews: Math.floor(Math.random() * 100) + 20,
            price: helpers.formatPrice(eventData.price || 'Gratuit'),
            priceCategory: eventData.price && eventData.price !== 'Gratuit' ? 'Payant' : 'Gratuit',
            organizer: 'Nouvel organisateur',
            type: eventData.category,
            category: eventData.category,
            format: eventData.format,
            image: eventData.imageUrl || 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80'
        };

        this.events.unshift(newEvent);
        this.filteredEvents = [...this.events];
        this.generateEvents();
        this.generateHomeEvents();
        
        return newEvent;
    }

    // Ajouter un commentaire à un événement
    addComment(eventId, comment, rating) {
        const event = this.getEventById(eventId);
        if (!event) return false;

        if (!event.comments) event.comments = [];
        event.comments.push(`${comment} - ${rating}⭐`);
        
        return true;
    }

    // Définir l'événement actuel
    setCurrentEvent(eventId) {
        this.currentEvent = this.getEventById(eventId);
        return this.currentEvent;
    }

    // Obtenir l'événement actuel
    getCurrentEvent() {
        return this.currentEvent;
    }
}