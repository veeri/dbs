-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.7.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for dbs_assign
CREATE DATABASE IF NOT EXISTS `dbs_assign` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dbs_assign`;

-- Dumping structure for table dbs_assign.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `role` char(10) NOT NULL DEFAULT 'EMPLOYEE',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table dbs_assign.user: ~7 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `name`, `email`, `password`, `role`) VALUES
	(1, 'veeresh', 'veeresh@gmail.com', 'qwe', 'EMPLOYEE'),
	(2, 'mahesh', 'mahesh@gmail.com', '123', 'ADMIN'),
	(3, 'ragava', 'r@gmail.com', '1234', 'EMPLOYEE'),
	(7, 'ragava', 'ragava@gmail.com', '1234', 'EMPLOYEE'),
	(10, 'ragava', 'ragava2@gmail.com', '1234', 'EMPLOYEE'),
	(11, 'ramesh', 'ra@gmail.com', '1234', 'EMPLOYEE'),
	(12, 'radmin', 'radmin@gmail.com', '1234', 'ADMIN');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
