-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 09 juin 2023 à 05:54
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
-- Structure de la table `form_fields`
--

CREATE TABLE `form_fields` (
  `form_id` int(11) NOT NULL,
  `fields_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `form_fields`
--

INSERT INTO `form_fields` (`form_id`, `fields_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(1, 2),
(2, 3),
(4, 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `form_fields`
--
ALTER TABLE `form_fields`
  ADD PRIMARY KEY (`form_id`,`fields_id`),
  ADD KEY `FKko3f2jo4c0rthiq1ajom43di7` (`fields_id`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `form_fields`
--
ALTER TABLE `form_fields`
  ADD CONSTRAINT `FKgjgcm3k6uylmn5j75la47pl35` FOREIGN KEY (`form_id`) REFERENCES `form` (`id`),
  ADD CONSTRAINT `FKko3f2jo4c0rthiq1ajom43di7` FOREIGN KEY (`fields_id`) REFERENCES `field` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
