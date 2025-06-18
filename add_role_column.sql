ALTER TABLE utilisateur ADD COLUMN role ENUM('utilisateur', 'organisateur', 'administrateur') DEFAULT 'utilisateur';
