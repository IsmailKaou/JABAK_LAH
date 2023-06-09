-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 09 juin 2023 à 10:49
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
-- Structure de la table `impaye`
--

CREATE TABLE `impaye` (
  `id` bigint(20) NOT NULL,
  `amount` double NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `creance_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `impaye`
--

INSERT INTO `impaye` (`id`, `amount`, `name`, `type`, `client_id`, `creance_id`) VALUES
(6, 500, 'Abonnement ', 'Cost', 1, 1),
(7, 40000, 'Abonnement internet', 'Penalty', 1, 1),
(8, 500, 'Carte sim', 'Bill', 1, 2),
(9, 500, 'Internet ', 'Bill', 2, 3),
(10, 200, 'Frais itinérance non réglés', 'Bill', 1, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `impaye`
--
ALTER TABLE `impaye`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKci9t3c2raxf9e15qb5nfkje7p` (`client_id`),
  ADD KEY `FKq5hpi5ai90auob1iubxabvsto` (`creance_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `impaye`
--
ALTER TABLE `impaye`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `impaye`
--
ALTER TABLE `impaye`
  ADD CONSTRAINT `FKci9t3c2raxf9e15qb5nfkje7p` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `FKq5hpi5ai90auob1iubxabvsto` FOREIGN KEY (`creance_id`) REFERENCES `creance` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
