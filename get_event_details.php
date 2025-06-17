<?php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'eventhub';
$user = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur de connexion à la base de données']);
    exit;
}

// Vérifier que l'ID est fourni
if (!isset($_GET['id']) || empty($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID d\'événement manquant']);
    exit;
}

$eventId = intval($_GET['id']);

try {
    // Récupérer les détails de l'événement
    $sql = "SELECT * FROM evenement WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$eventId]);
    $event = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$event) {
        http_response_code(404);
        echo json_encode(['error' => 'Événement non trouvé']);
        exit;
    }
    
    // Formatage des données pour l'affichage
    $event['price'] = ($event['prix'] == 0) ? 'Gratuit' : $event['prix'] . '€';
    $event['priceCategory'] = ($event['prix'] == 0) ? 'Gratuit' : 'Payant';
    
    // Formatage de la date
    if ($event['date']) {
        $eventDate = new DateTime($event['date']);
        $event['date'] = $eventDate->format('d F Y H:i');
    }
    
    // Ajout de données factices si non présentes dans la BD
    $event['participants'] = $event['participants'] ?? rand(50, 500);
    $event['rating'] = $event['rating'] ?? number_format(rand(40, 50) / 10, 1);
    $event['reviews'] = $event['reviews'] ?? rand(20, 150);
    $event['organizer'] = $event['organizer'] ?? 'Organisateur EventHub';
    
    // Retourner les données en JSON
    header('Content-Type: application/json');
    echo json_encode($event);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la récupération des données']);
}
?>