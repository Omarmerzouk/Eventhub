<?php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'eventhub';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    exit('Erreur de connexion : ' . $e->getMessage());
}

// Traitement du formulaire
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = trim($_POST['nom']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Validation des champs
    if (empty($nom) || empty($email) || empty($password)) {
        exit('Tous les champs sont requis.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit('Email invalide.');
    }

// Vérifier si l'email existe déjà
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM utilisateur WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetchColumn() > 0) {
        header("Location: echoue_inscription.html?error=email_exists");
        exit;
    }

    // Hasher le mot de passe
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // Insérer l'utilisateur
    $stmt = $pdo->prepare("INSERT INTO utilisateur (nom, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$nom, $email, $passwordHash]);

    // Redirection après succès
    header("Location: hl.php");
    exit;
}
?>
