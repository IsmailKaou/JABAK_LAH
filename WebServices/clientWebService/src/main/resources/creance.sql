-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 09 juin 2023 à 05:55
-- Version du serveur :  5.7.34
-- Version de PHP : 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `JabakLah`
--

-- --------------------------------------------------------

--
-- Structure de la table `creance`
--

CREATE TABLE `creance` (
  `id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `form_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `creance`
--

INSERT INTO `creance` (`id`, `category`, `code`, `name`, `form_id`) VALUES
(1, 'frais', 'TI123', 'TELEPHONIE ET INTERNET SIM', 1),
(2, 'frais', 'PMS123', 'PRODUIT MOBILE SIM', 2),
(3, 'frais', 'PFS123', 'PRODUIT FIXE SIM', 1),
(4, 'frais', 'PIS123', 'PRODUIT INTERNET SIM', 2),
(5, 'frais', 'FAT123', 'FACTURES AMENDIS TANGER', 4),
(6, 'frais', 'FR123', 'FACTURES REDAL', 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `creance`
--
ALTER TABLE `creance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKp9lncln5pad26bousnuqu5bit` (`form_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `creance`
--
ALTER TABLE `creance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `creance`
--
ALTER TABLE `creance`
  ADD CONSTRAINT `FKp9lncln5pad26bousnuqu5bit` FOREIGN KEY (`form_id`) REFERENCES `form` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
