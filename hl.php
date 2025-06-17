<?php
session_start(); // important !

// Connexion à la base de données
$host = 'localhost';
$dbname = 'eventhub';
$user = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Activer les erreurs PDO
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

// Traitement du formulaire de création d'événement
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["title"])) {
    $titre = $_POST['title'];
    $description = $_POST['description'];
    $date = $_POST['dateTime'];
    $lieu = $_POST['city'] . ', ' . $_POST['country'];
    $prix = !empty($_POST['price']) ? $_POST['price'] : 0;
    $organisateur_id = $_SESSION['user_id'] ?? null; // doit être défini à la connexion
    $type = $_POST['category'];
    $format = $_POST['format'];
    $image = !empty($_POST['imageUrl']) ? $_POST['imageUrl'] : null;
    $date_creation = date('Y-m-d H:i:s');
    
    // Nouveaux champs
    $session_info = !empty($_POST['sessionInfo']) ? $_POST['sessionInfo'] : null;
    $capacite = !empty($_POST['capacity']) ? $_POST['capacity'] : null;
    $lien_localisation = !empty($_POST['locationLink']) ? $_POST['locationLink'] : null;

    // Insertion dans la base
    $sql = "INSERT INTO evenement (titre, description, date, lieu, prix, organisateur_id, type, format, image, date_creation, session_info, capacite, lien_localisation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$titre, $description, $date, $lieu, $prix, $organisateur_id, $type, $format, $image, $date_creation, $session_info, $capacite, $lien_localisation]);

    // Redirection ou confirmation
    header("Location: hl.php?success=1");
    exit();
}

// --- Fetch events from database ---
$sql_fetch_events = "SELECT * FROM evenement ORDER BY date_creation DESC"; // Order by creation date, newest first
$stmt_fetch_events = $pdo->query($sql_fetch_events);
$db_events = $stmt_fetch_events->fetchAll(PDO::FETCH_ASSOC);

// Convert price to string format for display, handle 0 as 'Gratuit'
foreach ($db_events as &$event) {
    $event['price'] = ($event['prix'] == 0) ? 'Gratuit' : $event['prix'] . '€';
    $event['priceCategory'] = ($event['prix'] == 0) ? 'Gratuit' : 'Payant';
    // Format date for display (assuming 'date' column is a datetime string)
    $eventDate = new DateTime($event['date']);
    $event['date'] = $eventDate->format('d F Y H:i'); // Example format: 15 juin 2024 10:00
    // Add dummy participants, rating, reviews, organizer if not in DB
    $event['participants'] = $event['participants'] ?? rand(50, 500);
    $event['rating'] = $event['rating'] ?? number_format(rand(40, 50) / 10, 1);
    $event['reviews'] = $event['reviews'] ?? rand(20, 150);
    $event['organizer'] = $event['organizer'] ?? 'Organisateur EventHub'; // Replace with actual organizer name if available
}
unset($event); // Break the reference with the last element

$event_count = count($db_events);

?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EventHub - Plateforme d'Événements</title>
    <link rel="stylesheet" href="styles.css" />
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
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
        <a href="#accueil" class="nav-link" onclick="showSection('accueil')">Accueil</a>
                <a href="#evenements" class="nav-link" onclick="showSection('evenements')">Événements</a>
                <a href="#apropos" class="nav-link" onclick="showSection('apropos')">À propos</a>
            </nav>
            <div class="nav-actions">


      <!-- Utilisateur connecté -->
<div class="notification-bell" onclick="toggleNotifications()">
    <i class="fas fa-bell"></i>
    <span class="notification-badge">0</span>
    <div class="notification-dropdown">
        <div class="notification-item">
            <div class="notification-title">Aucune notification</div>
            <div class="notification-message">Vous n'avez pas de notifications pour le moment.</div>
        </div>
    </div>
</div>
    <button id="createEventBtn" class="btn-primary" onclick="openCreateEventModal()">➕ Créer un événement</button>
    <form style="display:inline;" method="post" action="logout.php">
        <a href="logout.php"><button type="submit" class="btn-ghost">🔓 Se déconnecter</button></a>
    </form>

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
                            <div class="stat-number">25+</div>
                            <div class="stat-label">Événements disponibles</div>
                        </div>
                        <div>
                            <div class="stat-number">10K+</div>
                            <div class="stat-label">Participants</div>
                        </div>
                        <div>
                            <div class="stat-number">15</div>
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
                <div id="homeEventsGrid" class="events-grid">
                    <?php
                    // Display first 6 events from DB on home page
                    $home_events = array_slice($db_events, 0, 6);
                    foreach ($home_events as $event) {
                        $format_class = ($event['format'] === 'Présentiel') ? 'format-presentiel' : 'format-enligne';
echo "<div class=\"event-card\" onclick=\"openEventModal('{$event['id']}')\">";
                        echo "<img src=\"{$event['image']}\" alt=\"{$event['titre']}\" class=\"event-image\">";
                        echo "<div class=\"event-content\">";
                        echo "<div class=\"event-header\">";
                        echo "<span class=\"event-type\">{$event['type']}</span>";
                        echo "<span class=\"event-format {$format_class}\">{$event['format']}</span>";
                        echo "</div>";
                        echo "<h3 class=\"event-title\">{$event['titre']}</h3>";
                        echo "<p class=\"event-description\">{$event['description']}</p>";
                        echo "<div class=\"event-details\">";
                        echo "<div class=\"event-detail\"><i class=\"fas fa-calendar\"></i><span>{$event['date']}</span></div>";
                        echo "<div class=\"event-detail\"><i class=\"fas fa-map-marker-alt\"></i><span>{$event['lieu']}</span></div>";
                        echo "<div class=\"event-detail\"><i class=\"fas fa-users\"></i><span>{$event['participants']} participants</span></div>";
                        echo "</div>";
                        echo "<div class=\"event-footer\">";
                        echo "<div class=\"event-rating\"><span>⭐</span><span>{$event['rating']}</span><span style=\"color: #6b7280; font-size: 14px;\">({$event['reviews']} avis)</span></div>";
                        echo "<div class=\"event-price\">{$event['price']}</div>";
                        echo "</div>";
                        echo "</div>";
                        echo "</div>";
                    }
                    ?>
                </div>
            </div>
        </section>
    </section>

    <!-- Section Événements -->
    <section id="evenements">
        <div class="container">
            <div class="section-header">
                <h2>Tous les événements (<span id="eventCount"><?php echo $event_count; ?></span>)</h2>
                <!-- Filters button - functionality will be limited without server-side filtering -->
                <button class="btn-filter" onclick="toggleFilters()">🔽 Filtres</button>
            </div>

            <div class="events-layout">
                <!-- Filters Sidebar - functionality will be limited without server-side filtering -->
                <div id="filtersSidebar" class="filters-sidebar">
                    <h3>Filtres</h3>

                    <div class="filter-group">
                        <h4>Pays</h4>
                        <label><input type="checkbox" value="Finlande"> Finlande</label>
                        <label><input type="checkbox" value="Portugal"> Portugal</label>
                        <label><input type="checkbox" value="Norvège"> Norvège</label>
                        <label><input type="checkbox" value="États-Unis">États-Unis</label>
                        <label><input type="checkbox" value="Italie">Italie</label>
                        <label><input type="checkbox" value="Autriche">Autriche</label>
                        <label><input type="checkbox" value="France"> France</label>
                        <label><input type="checkbox" value="Allemagne"> Allemagne</label>
                        <label><input type="checkbox" value="Royaume-Uni"> Royaume-Uni</label>
                        <label><input type="checkbox" value="Suède"> Suède</label>
                        <label><input type="checkbox" value="Suisse"> Suisse</label>
                        <label><input type="checkbox" value="République Tchèque"> République Tchèque</label>
                        <label><input type="checkbox" value="Belgique"> Belgique</label>
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
     <div id="eventsGrid" class="events-grid">
         <?php
         // Display all events from DB on events page
         foreach ($db_events as $event) {
             $format_class = ($event['format'] === 'Présentiel') ? 'format-presentiel' : 'format-enligne';
echo "<div class=\"event-card\" onclick=\"openEventModal('{$event['id']}')\">";
             echo "<img src=\"{$event['image']}\" alt=\"{$event['titre']}\" class=\"event-image\">";
             echo "<div class=\"event-content\">";
             echo "<div class=\"event-header\">";
             echo "<span class=\"event-type\">{$event['type']}</span>";
             echo "<span class=\"event-format {$format_class}\">{$event['format']}</span>";
             echo "</div>";
             echo "<h3 class=\"event-title\">{$event['titre']}</h3>";
             echo "<p class=\"event-description\">{$event['description']}</p>";
             echo "<div class=\"event-details\">";
             echo "<div class=\"event-detail\"><i class=\"fas fa-calendar\"></i><span>{$event['date']}</span></div>";
             echo "<div class=\"event-detail\"><i class=\"fas fa-map-marker-alt\"></i><span>{$event['lieu']}</span></div>";
             echo "<div class=\"event-detail\"><i class=\"fas fa-users\"></i><span>{$event['participants']} participants</span></div>";
             echo "</div>";
             echo "<div class=\"event-footer\">";
             echo "<div class=\"event-rating\"><span>⭐</span><span>{$event['rating']}</span><span style=\"color: #6b7280; font-size: 14px;\">({$event['reviews']} avis)</span></div>";
             echo "<div class=\"event-price\">{$event['price']}</div>";
             echo "</div>";
             echo "</div>";
             echo "</div>";
         }
         ?>
     </div>


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


<div id="createEventModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal('createEventModal')">&times;</span>
        <h2>Créer un nouvel événement</h2>

       <form class="create-event-form" action="hl.php" method="POST">

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
                        <input type="radio" name="format" value="Présentiel" required onchange="toggleLocationFields()">
                        <div>
                            <strong>Présentiel</strong>
                            <p>Événement en personne dans un lieu physique</p>
                        </div>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="format" value="En ligne" required onchange="toggleLocationFields()">
                        <div>
                            <strong>En ligne</strong>
                            <p>Événement virtuel accessible depuis n'importe où</p>
                        </div>
                    </label>
                </div>
            </div>

            <div class="form-section">
                <h3>Détails de localisation/accès</h3>
                <div class="form-group">
                    <label for="locationLink" id="locationLinkLabel">Adresse complète / Lien de connexion *</label>
                    <input type="text" name="locationLink" id="locationLinkInput" placeholder="Adresse complète ou lien Meet/Zoom" required>
                    <small id="locationHelpText" class="form-help-text">Pour un événement présentiel, indiquez l'adresse complète. Pour un événement en ligne, indiquez le lien de connexion (Meet, Zoom, etc.)</small>
                </div>
            </div>

            <div class="form-section">
                <h3>Capacité et sessions</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="capacity">Capacité maximale</label>
                        <input type="number" name="capacity" min="1" placeholder="ex: 50">
                        <small class="form-help-text">Nombre maximum de participants (optionnel)</small>
                    </div>
                </div>
                <div class="form-group">
                    <label for="sessionInfo">Informations sur les sessions (optionnel)</label>
                    <textarea name="sessionInfo" rows="3" placeholder="Décrivez les différentes sessions, ateliers ou parties de votre événement..."></textarea>
                    <small class="form-help-text">Détaillez le programme, les sessions ou ateliers prévus</small>
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
        <div id="eventModalContent"></div>
    </div>
</div>

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

    <!-- Embed event data for JavaScript -->
    <script>
        const dbEvents = <?php echo json_encode($db_events); ?>;
    </script>

    <!-- Required Lovable script for new features -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script src="script.js"></script>
</body>
</html>