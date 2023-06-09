-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 09 juin 2023 à 05:56
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
-- Structure de la table `creancier_creances`
--

CREATE TABLE `creancier_creances` (
  `creancier_id` int(11) NOT NULL,
  `creances_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `creancier_creances`
--

INSERT INTO `creancier_creances` (`creancier_id`, `creances_id`) VALUES
(1, 1),
(6, 1),
(8, 1),
(2, 2),
(5, 2),
(7, 2),
(2, 3),
(5, 3),
(7, 3),
(2, 4),
(5, 4),
(7, 4),
(4, 5),
(3, 6);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `creancier_creances`
--
ALTER TABLE `creancier_creances`
  ADD PRIMARY KEY (`creancier_id`,`creances_id`),
  ADD KEY `FKqruuuk1or86hgd4rtwwieotar` (`creances_id`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `creancier_creances`
--
ALTER TABLE `creancier_creances`
  ADD CONSTRAINT `FKqnvk5wuxi7kt7beixwpn37uco` FOREIGN KEY (`creancier_id`) REFERENCES `creancier` (`id`),
  ADD CONSTRAINT `FKqruuuk1or86hgd4rtwwieotar` FOREIGN KEY (`creances_id`) REFERENCES `creance` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
