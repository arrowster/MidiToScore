-- MySQL dump 10.13  Distrib 8.0.32, for macos13.0 (arm64)
--
-- Host: localhost    Database: music2
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `miditest2`
--

DROP TABLE IF EXISTS `miditest2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `miditest2` (
  `idmiditest2` int NOT NULL AUTO_INCREMENT,
  `filename1` varchar(45) NOT NULL,
  `actualfile1` blob NOT NULL,
  PRIMARY KEY (`idmiditest2`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `miditest2`
--

LOCK TABLES `miditest2` WRITE;
/*!40000 ALTER TABLE `miditest2` DISABLE KEYS */;
INSERT INTO `miditest2` VALUES (1,'test12',_binary 'test');
/*!40000 ALTER TABLE `miditest2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pdftest2`
--

DROP TABLE IF EXISTS `pdftest2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pdftest2` (
  `idpdftest2` int NOT NULL,
  `filename2` varchar(45) NOT NULL,
  `actualfile2` int NOT NULL,
  PRIMARY KEY (`idpdftest2`),
  UNIQUE KEY `idpdftest2_UNIQUE` (`idpdftest2`),
  UNIQUE KEY `filename2_UNIQUE` (`filename2`),
  UNIQUE KEY `actualfile2_UNIQUE` (`actualfile2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pdftest2`
--

LOCK TABLES `pdftest2` WRITE;
/*!40000 ALTER TABLE `pdftest2` DISABLE KEYS */;
/*!40000 ALTER TABLE `pdftest2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-02 15:33:21
