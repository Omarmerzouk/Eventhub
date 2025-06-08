// Données des 25 événements
const events = [
    {
        id: 1,
        title: 'Conférence Intelligence Artificielle 2024',
        description: 'Découvrez les dernières avancées en IA avec des experts internationaux...',
        date: '15 juin 2024',
        location: 'San Francisco, États-Unis',
        country: 'États-Unis',
        participants: 850,
        rating: 4.8,
        reviews: 127,
        price: '299€',
        priceCategory: 'Payant',
        organizer: 'TechEvents Inc.',
        type: 'Conférence',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        title: 'Workshop Digital Marketing',
        description: 'Maîtrisez les stratégies de marketing digital moderne avec des exercices...',
        date: '20 juin 2024',
        location: 'Londres, Royaume-Uni',
        country: 'Royaume-Uni',
        participants: 245,
        rating: 4.6,
        reviews: 89,
        price: '149€',
        priceCategory: 'Payant',
        organizer: 'Digital Academy',
        type: 'Workshop',
        format: 'En ligne',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        title: 'Séminaire Innovation Durable',
        description: 'Comment les entreprises peuvent innover tout en respectant...',
        date: '10 juillet 2024',
        location: 'Stockholm, Suède',
        country: 'Suède',
        participants: 320,
        rating: 4.9,
        reviews: 156,
        price: 'Gratuit',
        priceCategory: 'Gratuit',
        organizer: 'GreenTech Solutions',
        type: 'Séminaire',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 4,
        title: 'Formation Cybersécurité',
        description: 'Apprenez à protéger votre entreprise contre les cybermenaces...',
        date: '25 juillet 2024',
        location: 'Berlin, Allemagne',
        country: 'Allemagne',
        participants: 150,
        rating: 4.7,
        reviews: 67,
        price: '399€',
        priceCategory: 'Payant',
        organizer: 'CyberSafe Institute',
        type: 'Formation',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 5,
        title: 'Networking Startups Paris',
        description: 'Rencontrez les entrepreneurs les plus prometteurs de Paris...',
        date: '30 juin 2024',
        location: 'Paris, France',
        country: 'France',
        participants: 180,
        rating: 4.4,
        reviews: 92,
        price: '25€',
        priceCategory: 'Payant',
        organizer: 'Startup Network',
        type: 'Networking',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 6,
        title: 'Conférence Blockchain & Web3',
        description: 'Explorez l\'avenir décentralisé du web avec les pionniers de la blockchain...',
        date: '5 août 2024',
        location: 'Zurich, Suisse',
        country: 'Suisse',
        participants: 450,
        rating: 4.5,
        reviews: 203,
        price: '199€',
        priceCategory: 'Payant',
        organizer: 'Crypto Events',
        type: 'Conférence',
        format: 'En ligne',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 7,
        title: 'Salon des Voitures Électriques 2024',
        description: 'Découvrez les derniers modèles et technologies dans le domaine des véhicules électriques',
        date: '12 juin 2024',
        location: 'Paris, France',
        country: 'France',
        participants: 1200,
        rating: 4.7,
        reviews: 178,
        price: '15€',
        priceCategory: 'Payant',
        organizer: 'EcoMobilité France',
        type: 'Conférence',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba53aab43?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 8,
        title: 'Webinaire: Mobilité électrique et infrastructures',
        description: 'Analyse des enjeux du déploiement des bornes de recharge pour véhicules électriques',
        date: '18 juin 2024',
        location: 'Bruxelles, Belgique',
        country: 'Belgique',
        participants: 320,
        rating: 4.5,
        reviews: 65,
        price: 'Gratuit',
        priceCategory: 'Gratuit',
        organizer: 'European EV Association',
        type: 'Séminaire',
        format: 'En ligne',
        image: 'https://images.unsplash.com/photo-1620471603048-85bfb2ad4e8f?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 9,
        title: 'Workshop: Conception de batteries pour VE',
        description: 'Formation technique sur les dernières innovations en matière de batteries pour véhicules électriques',
        date: '22 juin 2024',
        location: 'Munich, Allemagne',
        country: 'Allemagne',
        participants: 75,
        rating: 4.9,
        reviews: 42,
        price: '450€',
        priceCategory: 'Payant',
        organizer: 'TechBatteries GmbH',
        type: 'Workshop',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1647323927523-3ba471cdc3c9?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 10,
        title: 'Séminaire sur l\'IA et le Marketing Digital',
        description: 'Explorer les applications de l\'intelligence artificielle dans les stratégies marketing modernes',
        date: '5 juillet 2024',
        location: 'Barcelone, Espagne',
        country: 'Espagne',
        participants: 220,
        rating: 4.6,
        reviews: 85,
        price: '199€',
        priceCategory: 'Payant',
        organizer: 'Digital Marketing Institute',
        type: 'Séminaire',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1553873095-cef5584ec3b6?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 11,
        title: 'Conférence sur la Cybersécurité en 2024',
        description: 'Les dernières tendances et menaces dans le domaine de la sécurité informatique',
        date: '15 juillet 2024',
        location: 'Amsterdam, Pays-Bas',
        country: 'Pays-Bas',
        participants: 380,
        rating: 4.8,
        reviews: 112,
        price: '299€',
        priceCategory: 'Payant',
        organizer: 'SecureTech Foundation',
        type: 'Conférence',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 12,
        title: 'Forum International de l\'Innovation Durable',
        description: 'Rencontre entre entrepreneurs, chercheurs et investisseurs sur les technologies vertes',
        date: '20 juillet 2024',
        location: 'Copenhague, Danemark',
        country: 'Danemark',
        participants: 450,
        rating: 4.7,
        reviews: 136,
        price: '250€',
        priceCategory: 'Payant',
        organizer: 'Green Innovation Network',
        type: 'Conférence',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 13,
        title: 'Workshop sur l\'autonomie des véhicules électriques',
        description: 'Techniques et technologies pour optimiser l\'autonomie des batteries',
        date: '25 juillet 2024',
        location: 'Milan, Italie',
        country: 'Italie',
        participants: 90,
        rating: 4.6,
        reviews: 38,
        price: '175€',
        priceCategory: 'Payant',
        organizer: 'EV Tech Italia',
        type: 'Workshop',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1617886212057-72b8598f60a3?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 14,
        title: 'Formation en développement React avancé',
        description: 'Maîtrisez les concepts avancés de React et les meilleures pratiques de développement',
        date: '1 août 2024',
        location: 'Dublin, Irlande',
        country: 'Irlande',
        participants: 60,
        rating: 4.9,
        reviews: 45,
        price: '599€',
        priceCategory: 'Payant',
        organizer: 'React Masters',
        type: 'Formation',
        format: 'En ligne',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 15,
        title: 'Congrès annuel sur les voitures électriques',
        description: 'Tendances, défis et opportunités dans l\'industrie des véhicules électriques',
        date: '5 août 2024',
        location: 'Oslo, Norvège',
        country: 'Norvège',
        participants: 750,
        rating: 4.8,
        reviews: 195,
        price: '350€',
        priceCategory: 'Payant',
        organizer: 'Nordic EV Association',
        type: 'Conférence',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1554744512-d6c603f27c54?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 16,
        title: 'Atelier Design Thinking',
        description: 'Méthodologies innovantes pour résoudre des problèmes complexes',
        date: '10 août 2024',
        location: 'Lisbonne, Portugal',
        country: 'Portugal',
        participants: 35,
        rating: 4.7,
        reviews: 28,
        price: '120€',
        priceCategory: 'Payant',
        organizer: 'Creative Solutions',
        type: 'Workshop',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1529119513315-c7c361862fc7?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 17,
        title: 'Conférence Européenne sur les Transports Électriques',
        description: 'Politiques publiques et initiatives privées pour une mobilité durable en Europe',
        date: '15 août 2024',
        location: 'Vienne, Autriche',
        country: 'Autriche',
        participants: 420,
        rating: 4.5,
        reviews: 110,
        price: '200€',
        priceCategory: 'Payant',
        organizer: 'European Sustainable Transport',
        type: 'Conférence',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1592940895528-bc56e8ce27a9?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 18,
        title: 'Networking: Entrepreneurs du Digital',
        description: 'Rencontrez des entrepreneurs innovants et développez votre réseau professionnel',
        date: '20 août 2024',
        location: 'Prague, République Tchèque',
        country: 'République Tchèque',
        participants: 150,
        rating: 4.4,
        reviews: 65,
        price: '15€',
        priceCategory: 'Payant',
        organizer: 'Digital Connect',
        type: 'Networking',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 19,
        title: 'Formation accélérée: Data Science',
        description: 'Acquérir les compétences essentielles en data science et machine learning',
        date: '25 août 2024',
        location: 'Helsinki, Finlande',
        country: 'Finlande',
        participants: 45,
        rating: 4.8,
        reviews: 32,
        price: '499€',
        priceCategory: 'Payant',
        organizer: 'DataMasters Academy',
        type: 'Formation',
        format: 'En ligne',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 20,
        title: 'Séminaire: Infrastructure de recharge pour flottes électriques',
        description: 'Solutions pratiques pour les entreprises qui souhaitent électrifier leur flotte',
        date: '1 septembre 2024',
        location: 'Genève, Suisse',
        country: 'Suisse',
        participants: 85,
        rating: 4.6,
        reviews: 29,
        price: 'Gratuit',
        priceCategory: 'Gratuit',
        organizer: 'Swiss E-Mobility',
        type: 'Séminaire',
        format: 'En ligne',
        image: 'https://images.unsplash.com/photo-1586763209832-ec5ea9ae2f33?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 21,
        title: 'Forum Tech: The Future of Work',
        description: 'Comment la technologie transforme le monde du travail et les compétences de demain',
        date: '5 septembre 2024',
        location: 'Stockholm, Suède',
        country: 'Suède',
        participants: 380,
        rating: 4.7,
        reviews: 105,
        price: '290€',
        priceCategory: 'Payant',
        organizer: 'FutureTech Foundation',
        type: 'Conférence',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1573164713619-24c711fe7878?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 22,
        title: 'Workshop: UI/UX Design pour applications mobiles',
        description: 'Principes et pratiques pour créer des expériences utilisateur exceptionnelles',
        date: '10 septembre 2024',
        location: 'Berlin, Allemagne',
        country: 'Allemagne',
        participants: 40,
        rating: 4.9,
        reviews: 36,
        price: '230€',
        priceCategory: 'Payant',
        organizer: 'UX Berlin',
        type: 'Workshop',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 23,
        title: 'Conférence sur les batteries nouvelle génération',
        description: 'Les avancées technologiques qui révolutionnent l\'autonomie des véhicules électriques',
        date: '15 septembre 2024',
        location: 'Francfort, Allemagne',
        country: 'Allemagne',
        participants: 310,
        rating: 4.8,
        reviews: 87,
        price: '275€',
        priceCategory: 'Payant',
        organizer: 'EV Battery Innovation',
        type: 'Conférence',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1601701119533-fde20cecbf4e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 24,
        title: 'Hackathon: Climate Tech',
        description: 'Développez des solutions innovantes pour lutter contre le changement climatique',
        date: '20 septembre 2024',
        location: 'Paris, France',
        country: 'France',
        participants: 200,
        rating: 4.7,
        reviews: 58,
        price: 'Gratuit',
        priceCategory: 'Gratuit',
        organizer: 'Climate Action Tech',
        type: 'Workshop',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1544819667-9bfc1de23d4e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 25,
        title: 'Symposium International sur la Mobilité Électrique',
        description: 'État des lieux et perspectives d\'avenir pour le marché mondial des véhicules électriques',
        date: '25 septembre 2024',
        location: 'Londres, Royaume-Uni',
        country: 'Royaume-Uni',
        participants: 580,
        rating: 4.9,
        reviews: 145,
        price: '400€',
        priceCategory: 'Payant',
        organizer: 'Global EV Council',
        type: 'Conférence',
        format: 'Présentiel',
        image: 'https://images.unsplash.com/photo-1607197109166-3ab4ee4b00fc?auto=format&fit=crop&w=800&q=80'
    }
];

let filteredEvents = [...events]; 
let currentEvent = null;
let isLoggedIn = false;

// Navigation
function showSection(sectionId) {
    // Cacher toutes les sections sauf evenements-accueil qui reste toujours sur la page d'accueil
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === 'evenements-accueil') {
            section.classList.toggle('active', sectionId === 'accueil');
        } else {
            section.classList.remove('active');
        }
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Mettre à jour les liens de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
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
        // Si on tape quelque chose lié aux événements, aller directement à la section événements
        const eventKeywords = ['evenement', 'événement', 'event', 'conference', 'conférence', 'workshop', 'seminaire', 'séminaire', 'formation', 'networking'];
        const isEventRelated = eventKeywords.some(keyword => query.includes(keyword));
        
        filteredEvents = events.filter(event => 
            event.title.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query) ||
            event.country.toLowerCase().includes(query) ||
            event.type.toLowerCase().includes(query) ||
            event.category.toLowerCase().includes(query)
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

// Gestion des filtres
function toggleFilters() {
    const sidebar = document.getElementById('filtersSidebar');
    sidebar.classList.toggle('open');
}

function applyFilters() {
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]:checked');
    const selectedFilters = Array.from(checkboxes).map(cb => cb.value);
    
    if (selectedFilters.length === 0) {
        filteredEvents = [...events];
    } else {
        filteredEvents = events.filter(event => 
            selectedFilters.includes(event.country) ||
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
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    currentEvent = event;
    
    const modalContent = document.getElementById('eventModalContent');

    let commentsHtml = '';
    if (event.comments && event.comments.length > 0) {
        commentsHtml += '<div style="margin-top: 30px;"><h4>Commentaires :</h4><ul>';
        event.comments.forEach(c => {
            commentsHtml += `<li style="margin-bottom: 10px; color: #374151;">🗨️ ${c}</li>`;
        });
        commentsHtml += '</ul></div>';
    }
    
    modalContent.innerHTML = `
        <input type="hidden" id="eventId" value="${event.id}">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div>
                <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">

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
                <h3 style="font-size: 24px; margin-bottom: 15px; color: #1f2937;">${event.title}</h3>
                <p style="color: #6b7280; margin-bottom: 20px; line-height: 1.6;">${event.description}</p>
                
                <div style="margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <i class="fas fa-calendar" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                        <span>${event.date}</span>
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <i class="fas fa-map-marker-alt" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                        <span>${event.location}</span>
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <i class="fas fa-users" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                        <span>${event.participants} participants</span>
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <i class="fas fa-building" style="width: 20px; margin-right: 10px; color: #6b7280;"></i>
                        <span>Organisé par ${event.organizer}</span>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <span style="color: #fbbf24; margin-right: 5px;">⭐</span>
                    <span style="font-weight: 600; font-size: 18px;">${event.rating}</span>
                    <span style="color: #6b7280; margin-left: 5px;">(${event.reviews} avis)</span>
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
                    <div style="font-size: 28px; font-weight: bold; color: #059669;">${event.price}</div>
                    <button onclick="reserveEvent()" class="btn-primary" style="padding: 12px 24px; font-size: 16px;">
                        Réserver ma place
                    </button>
                </div>
            </div>
        </div>
    `;
    
    openModal('eventModal');
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
    
    closeModal('eventModal');
    
    if (currentEvent.price === 'Gratuit') {
        showToast(`Réservation confirmée pour: ${currentEvent.title}`);
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

// Navigation au clavier
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.id === 'searchInput') {
        searchEvents();
    }
});
