<?php
session_start();

// Vérifier si l'utilisateur est administrateur
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'administrateur') {
    header('Location: index.php');
    exit;
}

// Connexion à la base de données
$host = 'localhost';
$dbname = 'eventhub';
$user = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

// Traitement de la suppression d'événement
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["delete_event"])) {
    $event_id = $_POST['event_id'];
    
    try {
        $sql = "DELETE FROM evenement WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$event_id]);
        
        $success_message = "Événement supprimé avec succès.";
    } catch (PDOException $e) {
        $error_message = "Erreur lors de la suppression : " . $e->getMessage();
    }
}

// Récupération de tous les événements
$sql_fetch_events = "SELECT e.*, u.nom as organisateur_nom FROM evenement e LEFT JOIN utilisateur u ON e.organisateur_id = u.id ORDER BY e.date_creation DESC";
$stmt_fetch_events = $pdo->query($sql_fetch_events);
$db_events = $stmt_fetch_events->fetchAll(PDO::FETCH_ASSOC);

// Récupération de tous les utilisateurs
$sql_fetch_users = "SELECT id, nom, email, role, date_creation FROM utilisateur ORDER BY date_creation DESC";
$stmt_fetch_users = $pdo->query($sql_fetch_users);
$db_users = $stmt_fetch_users->fetchAll(PDO::FETCH_ASSOC);

$event_count = count($db_events);
$user_count = count($db_users);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Administration - EventHub</title>
    <link rel="stylesheet" href="styles.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .admin-header {
            background: #1f2937;
            color: white;
            padding: 20px 0;
            margin-bottom: 30px;
        }
        
        .admin-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .stat-card i {
            font-size: 2rem;
            color: #2563eb;
            margin-bottom: 10px;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #1f2937;
        }
        
        .stat-label {
            color: #6b7280;
            font-size: 14px;
        }
        
        .admin-section {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .admin-section h3 {
            margin-bottom: 20px;
            color: #1f2937;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
        }
        
        .admin-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .admin-table th,
        .admin-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .admin-table th {
            background: #f9fafb;
            font-weight: 600;
            color: #374151;
        }
        
        .admin-table tr:hover {
            background: #f9fafb;
        }
        
        .btn-danger {
            background: #ef4444;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
        }
        
        .btn-danger:hover {
            background: #dc2626;
        }
        
        .role-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .role-utilisateur {
            background: #dbeafe;
            color: #1e40af;
        }
        
        .role-organisateur {
            background: #d1fae5;
            color: #065f46;
        }
        
        .role-administrateur {
            background: #fef3c7;
            color: #92400e;
        }
        
        .alert {
            padding: 12px 16px;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        
        .alert-success {
            background: #d1fae5;
            color: #065f46;
            border: 1px solid #a7f3d0;
        }
        
        .alert-error {
            background: #fee2e2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
    </style>
</head>
<body>
    <!-- Header Admin -->
    <div class="admin-header">
        <div class="container">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h1><i class="fas fa-cog"></i> Administration EventHub</h1>
                    <p>Bienvenue, <?php echo htmlspecialchars($_SESSION['user_name']); ?></p>
                </div>
                <div>
                    <a href="hl.php" class="btn-ghost" style="color: white;">🏠 Retour au site</a>
                    <a href="logout.php" class="btn-ghost" style="color: white;">🔓 Se déconnecter</a>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <!-- Messages d'alerte -->
        <?php if (isset($success_message)): ?>
            <div class="alert alert-success">
                <i class="fas fa-check-circle"></i> <?php echo $success_message; ?>
            </div>
        <?php endif; ?>
        
        <?php if (isset($error_message)): ?>
            <div class="alert alert-error">
                <i class="fas fa-exclamation-circle"></i> <?php echo $error_message; ?>
            </div>
        <?php endif; ?>

        <!-- Statistiques -->
        <div class="admin-stats">
            <div class="stat-card">
                <i class="fas fa-calendar-alt"></i>
                <div class="stat-number"><?php echo $event_count; ?></div>
                <div class="stat-label">Événements</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-users"></i>
                <div class="stat-number"><?php echo $user_count; ?></div>
                <div class="stat-label">Utilisateurs</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-user-tie"></i>
                <div class="stat-number"><?php echo count(array_filter($db_users, function($u) { return $u['role'] === 'organisateur'; })); ?></div>
                <div class="stat-label">Organisateurs</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-user-check"></i>
                <div class="stat-number"><?php echo count(array_filter($db_users, function($u) { return $u['role'] === 'utilisateur'; })); ?></div>
                <div class="stat-label">Utilisateurs</div>
            </div>
        </div>

        <!-- Gestion des événements -->
        <div class="admin-section">
            <h3><i class="fas fa-calendar-alt"></i> Gestion des événements</h3>
            <div style="overflow-x: auto;">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titre</th>
                            <th>Organisateur</th>
                            <th>Date</th>
                            <th>Lieu</th>
                            <th>Prix</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($db_events as $event): ?>
                        <tr>
                            <td><?php echo $event['id']; ?></td>
                            <td><?php echo htmlspecialchars($event['titre']); ?></td>
                            <td><?php echo htmlspecialchars($event['organisateur_nom'] ?? 'Non défini'); ?></td>
                            <td><?php echo date('d/m/Y H:i', strtotime($event['date'])); ?></td>
                            <td><?php echo htmlspecialchars($event['lieu']); ?></td>
                            <td><?php echo $event['prix'] == 0 ? 'Gratuit' : $event['prix'] . '€'; ?></td>
                            <td>
                                <form method="post" style="display: inline;" onsubmit="return confirm('Êtes-vous sûr de vouloir supprimer cet événement ?');">
                                    <input type="hidden" name="event_id" value="<?php echo $event['id']; ?>">
                                    <button type="submit" name="delete_event" class="btn-danger">
                                        <i class="fas fa-trash"></i> Supprimer
                                    </button>
                                </form>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Gestion des utilisateurs -->
        <div class="admin-section">
            <h3><i class="fas fa-users"></i> Gestion des utilisateurs</h3>
            <div style="overflow-x: auto;">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Rôle</th>
                            <th>Date d'inscription</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($db_users as $user): ?>
                        <tr>
                            <td><?php echo $user['id']; ?></td>
                            <td><?php echo htmlspecialchars($user['nom']); ?></td>
                            <td><?php echo htmlspecialchars($user['email']); ?></td>
                            <td>
                                <span class="role-badge role-<?php echo $user['role']; ?>">
                                    <?php 
                                    switch($user['role']) {
                                        case 'utilisateur': echo '👤 Utilisateur'; break;
                                        case 'organisateur': echo '🎯 Organisateur'; break;
                                        case 'administrateur': echo '🛠️ Administrateur'; break;
                                    }
                                    ?>
                                </span>
                            </td>
                            <td><?php echo date('d/m/Y', strtotime($user['date_creation'])); ?></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>