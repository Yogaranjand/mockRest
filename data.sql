-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.13-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             8.0.0.4396
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for mock_db
DROP DATABASE IF EXISTS `mock_db`;
CREATE DATABASE IF NOT EXISTS `mock_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mock_db`;


-- Dumping structure for table mock_db.applications
DROP TABLE IF EXISTS `applications`;
CREATE TABLE IF NOT EXISTS `applications` (
  `application_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `application_name` varchar(500) NOT NULL,
  `application_acronym` varchar(100) NOT NULL,
  PRIMARY KEY (`application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Dumping data for table mock_db.applications: ~3 rows (approximately)
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` (`application_id`, `application_name`, `application_acronym`) VALUES
	(1, 'CDR', 'CDR'),
	(2, 'Health Data Hub', 'HDH'),
	(13, 'sadsa56564rrr', 'dsads');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;


-- Dumping structure for table mock_db.application_model
DROP TABLE IF EXISTS `application_model`;
CREATE TABLE IF NOT EXISTS `application_model` (
  `application_model_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `application_id` bigint(20) unsigned NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`application_model_id`),
  KEY `FK_application_model_application` (`application_id`),
  KEY `FK_application_model_model` (`model_id`),
  CONSTRAINT `FK_application_model_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`application_id`),
  CONSTRAINT `FK_application_model_model` FOREIGN KEY (`model_id`) REFERENCES `models` (`model_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table mock_db.application_model: ~2 rows (approximately)
/*!40000 ALTER TABLE `application_model` DISABLE KEYS */;
INSERT INTO `application_model` (`application_model_id`, `application_id`, `model_id`) VALUES
	(1, 1, 1),
	(2, 2, 2);
/*!40000 ALTER TABLE `application_model` ENABLE KEYS */;


-- Dumping structure for table mock_db.models
DROP TABLE IF EXISTS `models`;
CREATE TABLE IF NOT EXISTS `models` (
  `model_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `model_name` varchar(200) NOT NULL,
  `model_content` text NOT NULL,
  PRIMARY KEY (`model_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table mock_db.models: ~2 rows (approximately)
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` (`model_id`, `model_name`, `model_content`) VALUES
	(1, 'user', '{}'),
	(2, 'profile', '{}');
/*!40000 ALTER TABLE `models` ENABLE KEYS */;


-- Dumping structure for table mock_db.model_data
DROP TABLE IF EXISTS `model_data`;
CREATE TABLE IF NOT EXISTS `model_data` (
  `model_data_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `model_id` bigint(20) unsigned NOT NULL,
  `data` text NOT NULL,
  PRIMARY KEY (`model_data_id`),
  KEY `FK_model_data_model` (`model_id`),
  CONSTRAINT `FK_model_data_model` FOREIGN KEY (`model_id`) REFERENCES `models` (`model_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table mock_db.model_data: ~2 rows (approximately)
/*!40000 ALTER TABLE `model_data` DISABLE KEYS */;
INSERT INTO `model_data` (`model_data_id`, `model_id`, `data`) VALUES
	(1, 1, '{}'),
	(2, 2, '{}');
/*!40000 ALTER TABLE `model_data` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
