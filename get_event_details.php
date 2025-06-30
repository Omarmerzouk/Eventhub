<?php
header('Content-Type: application/json');
// Connexion à la base de données
$host = 'localhost';
$dbname = 'eventhub';
$user = 'root';
$password = '';
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur de connexion : ' . $e->getMessage()]);
    exit;
}
if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM evenement WHERE id = ?");
        $stmt->execute([$id]);
        $event = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($event) {
            echo json_encode($event);
        } else {
            echo json_encode(['error' => 'Événement non trouvé']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Erreur lors de la récupération : ' . $e->getMessage()]);
    }
}
