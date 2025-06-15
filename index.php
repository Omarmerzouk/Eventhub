<?php
session_start();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EventHub - Plateforme d'Événements</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="nav-brand">
                <div class="logo">⭐</div>
                <h1>EventHub</h1>
            </div>
            <nav class="nav-menu">
                <a href="#accueil" class="nav-link">Accueil</a>
                <a href="#evenements" class="nav-link">Événements</a>
                <a href="#apropos" class="nav-link">À propos</a>
            </nav>
            <div class="nav-actions">

<?php if (isset($_SESSION['user'])): ?>
    <!-- Utilisateur connecté -->
    <button id="createEventBtn" class="btn-primary" onclick="openCreateEventModal()">➕ Créer un événement</button>
    <form style="display:inline;" method="post" action="logout.php">
        <a href="logout.php"><button type="submit" class="btn-ghost">🔓 Se déconnecter</button></a>
    </form>
<?php else: ?>
    <!-- Utilisateur non connecté -->
    <button class="btn-ghost" onclick="openLoginModal()">🔐 Se connecter</button>
    <button class="btn-primary" onclick="openRegisterModal()">📝 S'inscrire</button>
<?php endif; ?>

            </div>
        </div>
    </header>

    <!-- Section accueil -->
    <section id="accueil" class="active">
        <!-- Hero Section -->
        <div class="hero-section">
            <div class="hero-bg"></div>
            <div class="container">
                <div class="hero-content">
                    <div class="star">⭐</div>
                    <h1>Découvrez les meilleurs <span class="highlight">événements</span> près de chez vous</h1>
                    <p>Connectez-vous avec votre communauté et participez à des expériences inoubliables</p>
                    
                    <div class="search-bar">
                        <input type="text" id="searchInput" placeholder="Rechercher un événement, une ville, un type..." onkeydown="if(event.key==='Enter') searchEvents()">
                        <button class="btn-search" onclick="searchEvents()">🔍 Rechercher</button>
                    </div>
                    
                    <div class="stats">
                        <div>
                            <div class="stat-number">30+</div>
                            <div class="stat-label">Événements disponibles</div>
                        </div>
                        <div>
                            <div class="stat-number">12K+</div>
                            <div class="stat-label">Participants</div>
                        </div>
                        <div>
                            <div class="stat-number">18</div>
                            <div class="stat-label">Pays</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section Événements sur l'accueil -->
        <section id="evenements-accueil" class="active">
            <div class="container">
                <div class="section-header">
                    <h2>Événements à la une</h2>
                    <button class="btn-filter" onclick="showSection('evenements')">Voir tous les événements</button>
                </div>
                <div id="homeEventsGrid" class="events-grid"></div>
            </div>
        </section>
    </section>
                

    <!-- Section Événements -->
    <section id="evenements">
        <div class="container">
            <div class="section-header">
                <h2>Tous les événements (<span id="eventCount">30</span>)</h2>
                <button class="btn-filter" onclick="toggleFilters()">🔽 Filtres</button>
            </div>
            
            <div class="events-layout">
                <div id="filtersSidebar" class="filters-sidebar">
                    <h3>Filtres</h3>
                    
                    <div class="filter-group">
                        <h4>Pays</h4>
                        <label><input type="checkbox" value="France"> France</label>
                        <label><input type="checkbox" value="Allemagne"> Allemagne</label>
                        <label><input type="checkbox" value="Royaume-Uni"> Royaume-Uni</label>
                        <label><input type="checkbox" value="Suisse"> Suisse</label>
                        <label><input type="checkbox" value="Belgique"> Belgique</label>
                        <label><input type="checkbox" value="Pays-Bas"> Pays-Bas</label>
                        <label><input type="checkbox" value="Espagne"> Espagne</label>
                        <label><input type="checkbox" value="Italie"> Italie</label>
                    </div>
                    
                    <div class="filter-group">
                        <h4>Type d'événement</h4>
                        <label><input type="checkbox" value="Conférence"> Conférence</label>
                        <label><input type="checkbox" value="Workshop"> Workshop</label>
                        <label><input type="checkbox" value="Séminaire"> Séminaire</label>
                        <label><input type="checkbox" value="Formation"> Formation</label>
                        <label><input type="checkbox" value="Networking"> Networking</label>
                    </div>
                    
                    <div class="filter-group">
                        <h4>Prix</h4>
                        <label><input type="checkbox" value="Gratuit"> Gratuit</label>
                        <label><input type="checkbox" value="Payant"> Payant</label>
                    </div>
                    
                    <button class="btn-primary btn-full" onclick="applyFilters()">Appliquer les filtres</button>
                </div>
                
                <div id="eventsGrid" class="events-grid"></div>
            </div>
        </div>
    </section>

    <!-- Section À propos -->
    <section id="apropos">
        <div class="about-section">
            <div class="container">
                <div class="about-content">
                    <h2>À propos d'EventHub</h2>
                    <p>EventHub est la plateforme de référence pour découvrir et participer aux meilleurs événements professionnels et personnels.</p>
                    <p>Notre mission est de connecter les personnes passionnées et de créer des expériences enrichissantes qui favorisent l'apprentissage, le networking et l'innovation.</p>
                    <p>Que vous soyez à la recherche de conférences technologiques, de workshops créatifs, ou d'événements de networking, EventHub vous aide à trouver exactement ce que vous cherchez.</p>
                </div>
                
                <div class="features">
                    <div class="feature">
                        <i class="fas fa-search"></i>
                        <h3>Recherche avancée</h3>
                        <p>Trouvez facilement les événements qui vous intéressent grâce à nos filtres intelligents.</p>
                    </div>
                    <div class="feature">
                        <i class="fas fa-globe"></i>
                        <h3>Événements internationaux</h3>
                        <p>Découvrez des événements dans le monde entier, en présentiel ou en ligne.</p>
                    </div>
                    <div class="feature">
                        <i class="fas fa-users"></i>
                        <h3>Communauté active</h3>
                        <p>Rejoignez une communauté de professionnels et d'passionnés partageant vos intérêts.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

  <!-- Modal de connexion -->
<div id="loginModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal('loginModal')">&times;</span>
        <h2>Connexion</h2>
  <!-- Formulaire de connexion (POST vers login.php) -->
        <form method="post" action="login.php">
            <label>Email :</label>
            <input type="email" name="email" placeholder="exemple@email.com" required><br><br>

            <label>Mot de passe :</label>
            <input type="password" name="password" placeholder="Votre mot de passe" required><br><br>

            <button type="submit" class="btn-primary btn-full">Se connecter</button>
        </form>
    </div>
</div>

</div>



<!-- Modal d'inscription -->
<div id="registerModal" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeModal('registerModal')">&times;</span>
    <h2>Inscription</h2>
<form action="register.php" method="POST">
      <label for="nom">Nom Prénom :</label>
      <input type="text" id="nom" name="nom" required>

      <label for="email">Email :</label>
      <input type="email" id="email" name="email" placeholder="exemple@email.com" required>

      <label for="password">Mot de passe :</label>
      <input type="password" id="password" name="password" placeholder="Votre mot de passe" required>

      <br><br>
      <button type="submit" class="btn-primary btn-full">S'inscrire</button>
    </form>

  </div>
</div>

    <!-- Modal de création d'événement -->
    <div id="createEventModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal('createEventModal')">&times;</span>
            <h2>Créer un nouvel événement</h2>
            <form class="create-event-form" onsubmit="createEvent(event)">
                <div class="form-section">
                    <h3>Informations générales</h3>
                    <div class="form-group">
                        <label for="title">Titre de l'événement *</label>
                        <input type="text" name="title" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description *</label>
                        <textarea name="description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="category">Catégorie *</label>
                        <select name="category" required>
                            <option value="">Sélectionner une catégorie</option>
                            <option value="Conférence">Conférence</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Séminaire">Séminaire</option>
                            <option value="Formation">Formation</option>
                            <option value="Networking">Networking</option>
                        </select>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Date et lieu</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dateTime">Date et heure *</label>
                            <input type="datetime-local" name="dateTime" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="city">Ville *</label>
                            <input type="text" name="city" required>
                        </div>
                        <div class="form-group">
                            <label for="country">Pays *</label>
                            <input type="text" name="country" required>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Format de l'événement</h3>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input type="radio" name="format" value="Présentiel" required>
                            <div>
                                <strong>Présentiel</strong>
                                <p>Événement en personne dans un lieu physique</p>
                            </div>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="format" value="En ligne" required>
                            <div>
                                <strong>En ligne</strong>
                                <p>Événement virtuel accessible depuis n'importe où</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Tarification</h3>
                    <div class="form-group">
                        <label for="price">Prix (laisser vide pour gratuit)</label>
                        <input type="text" name="price" placeholder="ex: 99€">
                    </div>
                </div>

                <div class="form-section">
                    <h3>Image</h3>
                    <div class="form-group">
                        <label for="imageUrl">URL de l'image (optionnel)</label>
                        <input type="url" name="imageUrl" placeholder="https://exemple.com/image.jpg">
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="closeModal('createEventModal')">Annuler</button>
                    <button type="submit" class="btn-primary">Créer l'événement</button>
                </div>
            </form>
        </div>
    </div>


<div id="eventModal" class="modal">
  <div class="modal-content event-modal">
    <span class="close" onclick="closeModal('eventModal')">&times;</span>
    
    <!-- Contenu déroulable ici -->
    <div id="eventModalContent" class="modal-scroll-content">
        <div id="eventModalContent" class="modal-scroll-content">

      <!-- Les commentaires seront injectés ici dynamiquement -->
    </div>
  </div>
</div>

    <!-- Modal de paiement -->
    <div id="paymentModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal('paymentModal')">&times;</span>
            <h2>Paiement sécurisé</h2>
            
            <div class="payment-summary">
                <h3 id="paymentEventTitle">Nom de l'événement</h3>
                <p>Prix: <strong id="paymentPrice">199€</strong></p>
            </div>
            
            <form onsubmit="processPayment(event)">
                <div class="form-group">
                    <label for="cardNumber">Numéro de carte</label>
                    <input type="text" placeholder="1234 5678 9012 3456" maxlength="19" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="expiryDate">Date d'expiration</label>
                        <input type="text" placeholder="MM/AA" maxlength="5" required>
                    </div>
                    <div class="form-group">
                        <label for="cvv">CVV</label>
                        <input type="text" placeholder="123" maxlength="3" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="cardName">Nom sur la carte</label>
                    <input type="text" placeholder="John Doe" required>
                </div>
                
                <button type="submit" class="btn-primary btn-full">Confirmer le paiement</button>
            </form>
        </div>
    </div>

    <!-- Toast notification -->
    <div id="toast" class="toast"></div>

    <!-- Script principal -->
    <script src="script.js"></script>
</body>
</html>