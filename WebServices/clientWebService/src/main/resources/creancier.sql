-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 08 juin 2023 à 19:14
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
-- Structure de la table `creancier`
--

CREATE TABLE `creancier` (
  `id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `creancier`
--

INSERT INTO `creancier` (`id`, `category`, `code`, `image`, `name`) VALUES
(1, 'factures', 'M123', 'Maroc Telecom.png', 'IAM Recharges'),
(2, 'recharges', 'I123', 'Maroc Telecom.png', 'IAM Factures'),
(3, 'factures', 'R123', 'Redal.jpg', 'Redal Factures'),
(4, 'factures', 'A123', 'Amendis Tanger.jpg', 'Amendis Tanger Factures'),
(5, 'factures', 'OF123', 'Orange.png', 'Orange Factures'),
(6, 'recharges', 'OR123', 'Orange.png', 'Orange Recharges'),
(7, 'factures', 'IF123', 'Inwi.jpg', 'Inwi Factures'),
(8, 'recharges', 'IR123', 'Inwi.jpg', 'Inwi Recharges');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `creancier`
--
ALTER TABLE `creancier`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `creancier`
--
ALTER TABLE `creancier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
