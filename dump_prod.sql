/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camp_registrations`
--

LOCK TABLES `camp_registrations` WRITE;
/*!40000 ALTER TABLE `camp_registrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `camp_registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camps`
--

DROP TABLE IF EXISTS `camps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `camps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `title_pl` varchar(200) DEFAULT NULL,
  `description` text NOT NULL,
  `description_pl` text DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `location` varchar(200) NOT NULL,
  `location_pl` varchar(200) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'EUR',
  `age_min` int(11) DEFAULT NULL,
  `age_max` int(11) DEFAULT NULL,
  `max_participants` int(11) NOT NULL DEFAULT 30,
  `current_participants` int(11) NOT NULL DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `type` enum('summer','winter','spring','autumn','special') NOT NULL DEFAULT 'summer',
  `level` enum('beginner','intermediate','advanced','all') NOT NULL DEFAULT 'all',
  `activities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`activities`)),
  `included_services` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`included_services`)),
  `requirements` text DEFAULT NULL,
  `requirements_pl` text DEFAULT NULL,
  `contact_email` varchar(150) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `registration_deadline` datetime DEFAULT NULL,
  `status` enum('draft','open','full','closed','cancelled') NOT NULL DEFAULT 'draft',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camps`
--

LOCK TABLES `camps` WRITE;
/*!40000 ALTER TABLE `camps` DISABLE KEYS */;
/*!40000 ALTER TABLE `camps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `category` enum('coach','footj','foots','veteran','sponsor','volunteer','other','inscription','information') DEFAULT NULL,
  `status` enum('new','read','replied') DEFAULT 'new',
  `replied` tinyint(1) DEFAULT 0,
  `repliedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_status` (`status`),
  KEY `idx_created` (`createdAt`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES
(1,'Pauline','HIRTZ','pauline@kamiicode.com','0776156964','Sujet test again prod','Sujet test again prodSujet test again prodSujet test again prodSujet test again prod',NULL,'new',0,NULL,'2026-01-29 14:50:38','2026-01-29 14:50:38'),
(2,'test','test','pauline@kamiicode.com','0776156964','Sujet test again prod','Sujet test again prodSujet test again prodSujet test again prodSujet test again prodSujet test again prod',NULL,'new',0,NULL,'2026-01-29 14:53:59','2026-01-29 14:53:59'),
(3,'Pauline','HIRTZ','pauline@kamiicode.com','0776156964','Sujet test again prod','kamiicodekamiicodekamiicodekamiicode',NULL,'new',0,NULL,'2026-01-29 15:03:34','2026-01-29 15:03:34'),
(4,'Pauline','HIRTZ','pauline@kamiicode.com','0776156964','Sujet test again prod','TestTestTestTestTestTest',NULL,'new',0,NULL,'2026-01-29 15:17:55','2026-01-29 15:17:55'),
(5,'Pauline','HIRTZ','pauline.kamiicode@gmail.com','0776156964','pauline.kamiicode@gmail.com ','pauline.kamiicode@gmail.com pauline.kamiicode@gmail.com pauline.kamiicode@gmail.com ',NULL,'new',0,NULL,'2026-01-29 15:20:25','2026-01-29 15:20:25'),
(6,'Pauline','HIRTZ','pauline.kamiicode@gmail.com','0776156964','pauline.kamiicode@gmail.com','pauline.kamiicode@gmail.compauline.kamiicode@gmail.compauline.kamiicode@gmail.compauline.kamiicode@gmail.com',NULL,'new',0,NULL,'2026-01-29 15:23:45','2026-01-29 15:23:45'),
(7,'Pauline','HIRTZ','pauline.kamiicode@gmail.com','0776156964','Sujet test again prod','pauline.kamiicode@gmail.compauline.kamiicode@gmail.compauline.kamiicode@gmail.com',NULL,'new',0,NULL,'2026-01-29 15:32:12','2026-01-29 15:32:12'),
(8,'Pauline','HIRTZ','pauline.kamiicode@gmail.com','0776156964','Sujet test again prod','pauline.kamiicode@gmail.compauline.kamiicode@gmail.compauline.kamiicode@gmail.com',NULL,'new',0,NULL,'2026-01-29 16:00:02','2026-01-29 16:00:02'),
(9,'Pauline','HIRTZ','test@test.com','0776156964','Sujet test again prod','PaulinePaulinePaulinePauline',NULL,'new',0,NULL,'2026-01-29 16:04:05','2026-01-29 16:04:05'),
(10,'Hirtz','Pauline','wutezi.pauline.ts2@gmail.com','+33776156964','Plop','Plop c\'est un tes',NULL,'new',0,NULL,'2026-02-06 20:33:22','2026-02-06 20:33:22'),
(11,'CG','HIRTZ','wutezi.pauline.ts2@gmail.com','+33776156964','Inscription Camp Olympique - Février 2026','Âge du participant: 8 ans\n\nTest inscription ',NULL,'new',0,NULL,'2026-02-06 21:14:27','2026-02-06 21:14:27');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `title_pl` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_pl` text DEFAULT NULL,
  `event_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `location` varchar(200) NOT NULL,
  `location_pl` varchar(200) DEFAULT NULL,
  `type` enum('training','tournament','social','meeting','other') NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `max_participants` int(11) DEFAULT NULL,
  `registration_required` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('upcoming','ongoing','completed','cancelled') NOT NULL DEFAULT 'upcoming',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `title_pl` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_pl` text DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `album_name` varchar(100) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `match_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `uploaded_by` int(11) NOT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `match_id` (`match_id`),
  KEY `team_id` (`team_id`),
  KEY `uploaded_by` (`uploaded_by`),
  CONSTRAINT `gallery_ibfk_10` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `gallery_ibfk_11` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `gallery_ibfk_12` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `gallery_ibfk_9` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `opponent_name` varchar(100) NOT NULL,
  `match_date` datetime NOT NULL,
  `location` varchar(200) NOT NULL,
  `is_home` tinyint(1) NOT NULL DEFAULT 1,
  `competition` varchar(100) DEFAULT NULL,
  `status` enum('scheduled','in_progress','finished','cancelled','postponed') NOT NULL DEFAULT 'scheduled',
  `score_home` int(11) DEFAULT NULL,
  `score_away` int(11) DEFAULT NULL,
  `match_report` text DEFAULT NULL,
  `match_report_pl` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `title_pl` varchar(200) DEFAULT NULL,
  `slug` varchar(250) NOT NULL,
  `content` text NOT NULL,
  `content_pl` text DEFAULT NULL,
  `excerpt` varchar(300) DEFAULT NULL,
  `excerpt_pl` varchar(300) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  `category` enum('match_report','event','announcement','general') NOT NULL DEFAULT 'general',
  `published_at` datetime DEFAULT NULL,
  `status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
  `is_pinned` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `slug_2` (`slug`),
  UNIQUE KEY `slug_3` (`slug`),
  UNIQUE KEY `slug_4` (`slug`),
  KEY `author_id` (`author_id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `news_ibfk_5` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `news_ibfk_6` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `partners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_pl` text DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `category` enum('main_sponsor','official_partner','supplier','media_partner') NOT NULL DEFAULT 'official_partner',
  `display_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
INSERT INTO `partners` VALUES
(5,'Le Petit Paris','Boulangerie, Lunch, Café, Vin','Boulangerie, Lunch, Cafe, Vin','Boulangerie, Lunch, Cafe, Vin',NULL,'/sponsors/petit-black.svg','https://www.petitparis.com.pl','main_sponsor',1,1,'2026-01-05 17:13:18','2026-01-05 17:13:18'),
(6,'endo design','Un intérieur avec du caractère','Interiors with character','Wnętrze z klimatem',NULL,'/sponsors/endodesign.png','https://www.endodesign.pl/','main_sponsor',2,1,'2026-01-05 17:13:18','2026-01-05 17:13:18'),
(7,'EXCO A2A Polska','Audit, consulting, comptabilité','Audit, consulting, accounting','Audyt, konsulting, księgowość',NULL,'/uploads/sponsors/ex-1770212718777-732303989.svg','https://exco.pl/','main_sponsor',0,1,'2026-01-05 17:13:18','2026-02-04 14:52:07'),
(8,'uzdrowisko','Appartements de luxe à la montagne ou en bord de mer','Luxury locations in the mountains or by the sea','Luksusowe apartamenty w górach i nad morzem',NULL,'/sponsors/uz.svg','https://uzdrowisko.org/','main_sponsor',3,1,'2026-01-05 17:13:18','2026-01-05 17:13:18'),
(13,'Kamiicode',NULL,NULL,NULL,NULL,'/uploads/sponsors/kamiicode-1770213878796-807796363.svg','https://kamiicode.com','media_partner',0,1,'2026-02-03 16:56:20','2026-02-04 15:04:38');
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `jersey_number` int(11) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `position_pl` varchar(50) DEFAULT NULL,
  `birth_year` int(11) NOT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `nationality_pl` varchar(50) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `distinction1` text DEFAULT NULL,
  `distinction2` text DEFAULT NULL,
  `distinction3` text DEFAULT NULL,
  `distinction4` text DEFAULT NULL,
  `distinction5` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `players_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES
(65,1,'Konstanty','Begiert',NULL,NULL,'midfielder','midfielder',2005,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(66,1,'Alessio','Bertoli','Alesjo',NULL,'defender','defender',1997,'Italy','Włochy',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(67,1,'Benon','Bestyński',NULL,NULL,'midfielder','midfielder',2006,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(68,1,'Jakub','Białasik','Biały',18,'defender','defender',1998,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098150/18_aorlz9.jpg','\"Kamień węgielny\" rundy jesiennej 2025/26',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:18:07'),
(69,1,'Piotr','Borowczyk',NULL,NULL,'forward','forward',1980,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(70,1,'Nedjm Eddine','Boukhedenna','Nedżm',NULL,'defender','defender',1999,'Algeria','Algeria',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(71,1,'Jakub','Budziszewski','Budzisz',11,'forward','forward',2005,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098154/11_ypwpuf.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:13:38'),
(72,1,'Taras','Demydenko',NULL,NULL,'forward','forward',2005,'Ukraine','Ukraina',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(73,1,'Karol','Dolata',NULL,NULL,'defender','defender',2007,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(74,1,'Jean Paul','Fortuna','Papierz',94,'forward','forward',1988,'France','Francja',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098147/94_gc7wtx.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:21:25'),
(75,1,'Jan','Gleba',NULL,7,'wingback','wingback',2005,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098155/7_r2kgeu.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:12:38'),
(76,1,'Jakub','Gorzelańczyk',NULL,NULL,'wingback','wingback',2004,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(77,1,'Marcin','Gruszczyński','Gru',NULL,'goalkeeper','goalkeeper',1983,'Poland','Polska',NULL,NULL,NULL,NULL,'\"Hard worker\" - Mistrz treningu rundy jesiennej 2025/26',NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(78,1,'Necip','Gündüz','Nedżyp',NULL,'forward','forward',2001,'Turkey','Turcja',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(79,1,'Dawid','Kapustka',NULL,3,'wingback','wingback',2006,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098159/3_xg90yd.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:10:58'),
(80,1,'Hubert','Klimacki','Klima',NULL,'defender','defender',2005,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(81,1,'Szymon','Kowal Weychan',NULL,NULL,'midfielder','midfielder',2006,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(82,1,'Hubert','Kucharczak',NULL,NULL,'defender','defender',1980,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(83,1,'Bruno','Laufer',NULL,14,'midfielder','midfielder',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098151/14_mcsuin.jpg','XI Miesiąca - kwiecień 2025r','XI Miesiąca - sierpień 2025r','Wychowanek Olympique - Debiut w seniorach: TPS 17.08.2025r',NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:16:23'),
(84,1,'Ruslan','Makarau',NULL,6,'defender','defender',1997,'Belarus','Białoruś',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098158/6_ctq4ai.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:12:14'),
(85,1,'Maciej','Małecki','Mały',NULL,'wingback','wingback',1980,'Poland','Polska',NULL,NULL,'XI Miesiąca - maj 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(86,1,'Filip','Marszał','Marszałek',5,'defender','defender',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098158/5_qluhpv.jpg',NULL,NULL,'Wychowanek Olympique - Debiut w seniorach: Wełnianka 20.09.2025r. (15 lat)',NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:11:41'),
(87,1,'Mikołaj','Marzyński',NULL,NULL,'forward','forward',2001,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098153/12_yj2odo.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:15:52'),
(88,1,'Aleksander','Michalak',NULL,77,'forward','forward',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098149/77_shfxha.jpg','XI Miesiąca - listopad 2025r',NULL,'Wychowanek Olympique - Debiut w seniorach: Uchorowo 6.09.2025r. (15 lat)',NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:19:58'),
(89,1,'Michał','Murawka',NULL,NULL,'forward','forward',1998,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(90,1,'Wojciech','Napierała',NULL,23,'wingback','wingback',2001,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098149/23_bmqoio.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:19:42'),
(91,1,'Sebastian','Nawrot',NULL,NULL,'defender','defender',1978,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(92,1,'Jean Paul','Niyigena','Żąpol',NULL,'defender','defender',1997,'Rwanda','Rwanda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(93,1,'Dalu','Nnabuike',NULL,NULL,'forward','forward',2001,'Nigeria','Nigeria',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(94,1,'Krzysztof','Nowak',NULL,NULL,'forward','forward',1978,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(95,1,'Kundainashe Brandon','Nyandoro','Brendon',4,'wingback','wingback',2004,'Zimbabwe','Zimbabwe',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098158/4_mijmmg.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:11:20'),
(96,1,'Keyd','Osman','Kejd',NULL,'forward','forward',2005,'Ethiopia','Etiopia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(97,1,'Andrzej','Polowczyk',NULL,NULL,'defender','defender',1981,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(98,1,'Danil','Pustovoi',NULL,NULL,'defender','defender',2003,'Ukraine','Ukraina',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(99,1,'Tomasz','Pyzałka',NULL,NULL,'midfielder','midfielder',1983,'Poland','Polska',NULL,NULL,'XI Miesiąca - kwiecień 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(100,1,'Grzegorz','Rak',NULL,NULL,'defender','defender',1983,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(101,1,'Cheikh Bamba','Sall','Bamba',NULL,'wingback','wingback',2002,'Senegal','Senegal',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(102,1,'Krzysztof','Sawicki',NULL,NULL,'wingback','wingback',1980,'Poland','Polska',NULL,NULL,'XI Miesiąca - listopad 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(103,1,'Marcin','Sędziak',NULL,NULL,'defender','defender',1980,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(104,1,'Mateusz','Sibila',NULL,NULL,'forward','forward',2000,'Poland','Polska',NULL,NULL,'XI Miesiąca - wrzesień 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(105,1,'Damian','Skwierzyński',NULL,NULL,'midfielder','midfielder',1989,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098152/17_kcinmy.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:17:07'),
(106,1,'Jakub','Sobieralski',NULL,NULL,'forward','forward',1989,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(107,1,'Jan','Sosnowski',NULL,NULL,'forward','forward',2009,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(108,1,'Mikołaj','Staszewski',NULL,10,'midfielder','midfielder',2000,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098154/10_twqcrb.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:13:09'),
(109,1,'Adrian','Wasielewski',NULL,99,'forward','forward',1995,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098147/99_ilynkq.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:22:19'),
(110,1,'Krzysztof','Weichert',NULL,NULL,'defender','defender',2001,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(111,1,'Aleksander','Wieroński','Alex',2,'wingback','wingback',2004,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769098161/2_gfahp1.jpg','XI Miesiąca - październik 2025r','XI Miesiąca - sierpień 2025r','MVP - Najlepszy zawodnik rundy jesiennej 2025/26',NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:10:25'),
(112,1,'Patryk','Wiszniewski',NULL,NULL,'midfielder','midfielder',1974,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(113,1,'Kacper','Zys',NULL,NULL,'goalkeeper','goalkeeper',2005,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(116,3,'Aleksander','Adamczewski',NULL,16,'midfielder','midfielder',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096949/16_h0y17e.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:00:01'),
(117,3,'Nikodem','Bielecki',NULL,20,'forward','forward',2010,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(118,3,'Witold','Borowiec',NULL,29,'wingback','wingback',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096948/29_cts3bw.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:03:29'),
(119,3,'Filip','Czylkowski',NULL,4,'wingback','wingback',2011,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(120,3,'Miłosz','Danielewicz',NULL,17,'goalkeeper','goalkeeper',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096947/17_la7mdj.jpg','XI Miesiąca - czerwiec 2025r','XI Miesiąca - październik 2025r',NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:01:49'),
(121,3,'Jan','Dawidowski','Dziadek',86,'forward','forward',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096946/86_ytj310.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:05:37'),
(122,3,'Michał','Garstecki','Gargamel',18,'forward','forward',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096947/18_ji8v0a.jpg','XI Miesiąca - wrzesień 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:02:09'),
(123,3,'Fryderyk','Górniak','Fryta',31,'midfielder','midfielder',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096947/31_yclpja.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:03:55'),
(124,3,'Marek','Grabarczyk','Graba',26,'defender','defender',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096947/26_txpaql.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:03:09'),
(125,3,'Wiktor','Hopcia',NULL,21,'defender','defender',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096948/21_kjcils.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:02:47'),
(126,3,'Franciszek','Kubaczyk',NULL,12,'midfielder','midfielder',2010,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(127,3,'Mateusz','Kucharczak','Kuchy',15,'midfielder','midfielder',2011,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096948/15_edeu49.jpg','XI Miesiąca - listopad 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:59:33'),
(128,3,'Szymon','Maćkowiak',NULL,NULL,'defender','defender',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096951/0_awb3er.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:54:08'),
(129,3,'Jakub','Nadstawski',NULL,19,'midfielder','midfielder',2010,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(130,3,'Aleksander','Orzechowski','Kosova',58,'wingback','wingback',2011,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096946/58_z3chah.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:04:28'),
(131,3,'Ian','Piechota',NULL,13,'midfielder','midfielder',2011,'Brazil','Brazylia',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096949/13_h3hykd.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:59:05'),
(132,3,'Karol','Pietkiewicz',NULL,34,'forward','forward',2010,'Poland','Polska',NULL,NULL,'XI Miesiąca - marzec 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(133,3,'Filip','Polcyn','Lipin',6,'midfielder','midfielder',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096950/6_pqac7q.jpg','XI Miesiąca - październik 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:55:21'),
(134,3,'Filip','Rak',NULL,95,'defender','defender',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096946/95_iofkam.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:06:01'),
(135,3,'Eryk','Rutowicz',NULL,9,'forward','forward',2011,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096949/9_nzitmf.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:58:14'),
(136,3,'Leon','Sobolewski',NULL,11,'midfielder','midfielder',2011,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096951/11_ykjcnd.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:58:32'),
(137,3,'Franciszek','Spychalski',NULL,7,'wingback','wingback',2011,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096950/7_cirmjb.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:56:06'),
(138,3,'Wojciech','Szrejbrowski',NULL,69,'midfielder','midfielder',2011,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(139,3,'Franciszek','Szumicki',NULL,1,'goalkeeper','goalkeeper',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096951/1_s5dpqj.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:54:48'),
(140,3,'Gabriel','Wutezi','Gabi',8,'midfielder','midfielder',2010,'France','Francja',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096949/8_jq5nlc.jpg',NULL,NULL,'Wychowanek Olympique - Debiut w seniorach: Karamba 26.10.2025r. (15 lat)',NULL,NULL,1,'2026-01-06 10:14:34','2026-01-24 15:17:27'),
(141,3,'Alex Dennis','Zadrowski',NULL,80,'midfielder','midfielder',2010,'Russia','Rosja',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096946/80_fjt4gb.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:05:10'),
(142,3,'Maciej','Zybura','Zybur',76,'defender','defender',2010,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769096946/76_xclxcp.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:04:48'),
(143,4,'Mieczysław','Baranowski','Miecio',18,'wingback','wingback',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095762/18_oe7bb6.jpg','XI Miesiąca - czerwiec 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:39:58'),
(144,4,'Mikołaj','Bielecki','Miki',11,'midfielder','midfielder',2013,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(145,4,'Dariusz','Cegłowski','Cegła',40,'defender','defender',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095761/40_i2ubmv.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:43:09'),
(146,4,'Mateusz','Garstecki','Gargamel',21,'forward','forward',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095762/21_tklrro.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:46:33'),
(147,4,'Szymon','Graczyk','Szymek',54,'goalkeeper','goalkeeper',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095761/54_fyqpja.jpg','Zaproszenia (Warta Poznań','XI Miesiąca - marzec 2025r',NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:42:14'),
(148,4,'Igor','Kowalczyk','Kowal',16,'forward','forward',2013,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(149,4,'Antoni','Krajewski','Kraju',6,'defender','defender',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(150,4,'Filip','Leśniewski','Szczurek',39,'wingback','wingback',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(151,4,'Aleksander','Majchrowicz','Majo',12,'midfielder','midfielder',2012,'Poland','Polska','https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095770/12_wqsdlp.jpg','https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095770/12_wqsdlp.jpg','XI Miesiąca - maj 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:41:03'),
(152,4,'Adam','Nawrot','Nawrocik',30,'forward','forward',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095764/30_c849fc.jpg','Zaproszenia (Przemysław Poznań)',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:35:04'),
(153,4,'Alan','Nowakowski','Ali',22,'defender','defender',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095762/22_ynr27e.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:41:44'),
(154,4,'Tymoteusz','Pokorski','Pokora',66,'midfielder','midfielder',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095761/66_vdqhjs.jpg','XI Miesiąca - listopad 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:43:33'),
(155,4,'Andrzej','Remisiewicz',NULL,NULL,'goalkeeper','goalkeeper',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(156,4,'Krystian','Rulczyński','Rolex',19,'wingback','wingback',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095762/19_dqlwls.jpg','XI Miesiąca - wrzesień 2025r','Zaproszenia (Poznańska 13)',NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:38:56'),
(157,4,'Michał','Tokarski','Tokar',14,'midfielder','midfielder',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095763/14_agxzjm.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:38:15'),
(158,4,'Paweł','Wachowiak',NULL,15,'defender','defender',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(159,4,'Alan','Walczak','Waluś',25,'midfielder','midfielder',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095763/25_itvh5h.jpg','XI Miesiąca - październik 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:36:27'),
(160,4,'Tomasz','Wegner','Wegi',3,'midfielder','midfielder',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095764/3_nnkyld.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:35:59'),
(161,4,'Antoni','Włodarczyk','Włodi',13,'midfielder','midfielder',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095763/13_elltab.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:35:31'),
(162,4,'Oscar','Wutezi','Ozzy',10,'midfielder','midfielder',2012,'France','Francja',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095764/10_whsimy.jpg','Kadra WZPN U13','2x Król Stzelców 2014/25 (78 bramek)','XI Miesiąca - maj 2025r','Zaproszenia (Miedź Legnica, Poznańska 13, Warta Poznań, APR Opalenica)',NULL,1,'2026-01-06 10:14:34','2026-01-23 15:34:05'),
(163,4,'Aleks','Zieliński','Zielu',28,'wingback','wingback',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095763/28_ucgxpf.jpg','XI Miesiąca - kwiecień 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:37:20'),
(164,5,'Jakub','Bogdanowicz',NULL,25,'goalkeeper','goalkeeper',2013,'Poland','Polska',NULL,'/uploads/players/player-1770304681400-869568042.jpeg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-02-05 16:18:01'),
(165,5,'Marcel','Buszkiewicz',NULL,41,'midfielder','midfielder',2012,'Poland','Polska',NULL,'/uploads/players/player-1770213897942-725527126.jpeg','XI Miesiąca - marzec 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-02-04 15:04:57'),
(166,5,'Stanisław','Chmiela',NULL,6,'midfielder','midfielder',2013,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(167,5,'Olivier','Głęboczyk',NULL,19,'defender','defender',2013,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(168,5,'Aleksander','Konarzewski',NULL,NULL,'defender','defender',2013,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(169,5,'Jakub','Kuźniewski',NULL,11,'defender','defender',2013,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1768836479/11_ji8bp5.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-23 12:51:12'),
(170,5,'Jan','Łubecki',NULL,17,'defender','defender',2013,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(171,5,'Cyprian','Mroczek',NULL,8,'midfielder','midfielder',2013,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(172,5,'Franciszek','Paterek',NULL,74,'midfielder','midfielder',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1768836479/74_i4ch4y.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:15:43'),
(173,5,'Tymon','Rybak',NULL,10,'midfielder','midfielder',2013,'Poland','Polska','https://res.cloudinary.com/dyygl0nvu/image/upload/v1768836480/10_gbfnln.jpg','https://res.cloudinary.com/dyygl0nvu/image/upload/v1768836480/10_gbfnln.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:21:55'),
(174,5,'Tadeusz','Sasiak',NULL,22,'midfielder','midfielder',2013,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1768836479/22_n2nkxd.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 15:34:02'),
(175,5,'Franciszek','Tomaszkiewicz',NULL,2,'defender','defender',2013,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(176,5,'Aleksander','Wertka',NULL,1,'goalkeeper','goalkeeper',2013,'Poland','Polska','https://res.cloudinary.com/dyygl0nvu/image/upload/v1768836479/1_j1djrr.jpg','https://res.cloudinary.com/dyygl0nvu/image/upload/v1768836479/1_j1djrr.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:23:07'),
(177,5,'Maksymilian','Wróblewski',NULL,26,'wingback','wingback',2013,'Poland','Polska','https://res.cloudinary.com/dyygl0nvu/image/upload/v1768836479/26_g5que2.jpg','https://res.cloudinary.com/dyygl0nvu/image/upload/v1768836479/26_g5que2.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:23:48'),
(178,6,'Jakub','Kokociński',NULL,NULL,'midfielder','midfielder',2014,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(179,6,'Leon','Kupczyk',NULL,14,'forward','forward',2014,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(180,6,'Stanisław','Miedziak',NULL,80,'defender','defender',2014,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769099465/80_anxqja.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:33:43'),
(181,6,'Wojciech','Miszczak',NULL,NULL,'goalkeeper','goalkeeper',2014,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(182,6,'Tymon','Młodzikowski','Tiger',21,'defender','defender',2013,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769095762/21_tklrro.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 16:37:54'),
(183,6,'Wojciech','Nowak',NULL,23,'midfielder','midfielder',2014,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769099466/23_a9ormo.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:32:02'),
(184,6,'Adam','Przybył',NULL,4,'wingback','wingback',2014,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769099468/4_e8ahbw.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:31:19'),
(185,6,'Gustaw','Pyzałka','Guti',13,'midfielder','midfielder',2014,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(186,6,'Igor','Ślesiński',NULL,47,'forward','forward',2014,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(187,6,'Aleksy','Stevens','Stivi',5,'midfielder','midfielder',2014,'England','Anglia',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769099467/5_v1i51w.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:31:40'),
(188,6,'Maciej','Wegner',NULL,30,'midfielder','midfielder',2014,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769099465/30_r4mwfc.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:33:11'),
(189,7,'Stanisław','Apolinarski','Apolo',47,'defender','defender',2012,'Poland','Polska',NULL,NULL,'XI Miesiąca - kwiecień 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(190,7,'Kirill','Baranov',NULL,4,'defender','defender',2012,'Ukraine','Ukraina',NULL,NULL,'XI Miesiąca - wrzesień 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(191,7,'Aleksander','Bielewski',NULL,7,'forward','forward',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(192,7,'Nazarii','Furhal','Nazar',22,'goalkeeper','goalkeeper',2012,'Ukraine','Ukraina',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(193,7,'Borys','Gładysz',NULL,95,'midfielder','midfielder',2011,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(194,7,'Adam','Grzechowiak',NULL,44,'forward','forward',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(195,7,'Mateusz','Haake',NULL,16,'defender','defender',2011,'Germany','Niemcy',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(196,7,'Tomasz','Holajda',NULL,35,'defender','defender',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(197,7,'Kajetan','Kachnic',NULL,24,'midfielder','midfielder',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(198,7,'Nikodem','Kołdyk',NULL,14,'forward','forward',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(199,7,'Wojciech','Łuczak',NULL,99,'midfielder','midfielder',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(200,7,'Teodor','Luque-Bandurski',NULL,NULL,'midfielder','midfielder',2012,'Spain','Hiszpania',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(201,7,'Franciszek','Miedziak',NULL,3,'defender','defender',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(202,7,'Tomasz','Misiurek',NULL,2,'wingback','wingback',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769099674/2_fajxeh.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:34:58'),
(203,7,'Igor','Nowakowski',NULL,38,'wingback','wingback',2012,'Poland','Polska',NULL,NULL,'XI Miesiąca - listopad 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(204,7,'Alexander','Nowicki',NULL,53,'forward','forward',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(205,7,'Aleksander','Olszewski',NULL,75,'goalkeeper','goalkeeper',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(206,7,'Hubert','Pyzałka','Pyza',42,'midfielder','midfielder',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769099673/42_kdfdf3.jpg','XI Miesiąca - sierpień 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:35:34'),
(207,7,'Bartosz','Sobieralski',NULL,15,'forward','forward',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(208,7,'Mateusz','Szmyt',NULL,5,'defender','defender',2012,'Poland','Polska',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(209,7,'Naum','Tubelets',NULL,31,'defender','defender',2012,'Ukraine','Ukraina',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(210,7,'Hubert','Wiszniewski',NULL,23,'defender','defender',2012,'Poland','Polska',NULL,'https://res.cloudinary.com/dyygl0nvu/image/upload/v1769099674/23_nzq6lv.jpg',NULL,NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-22 17:35:16'),
(211,7,'Jakub','Żok',NULL,3,'forward','forward',2012,'Poland','Polska',NULL,NULL,'XI Miesiąca - czerwiec 2025r',NULL,NULL,NULL,NULL,1,'2026-01-06 10:14:34','2026-01-06 10:14:34'),
(220,2,'Pauline','HIRTZ',NULL,4,'defender','defender',2016,'Poland','Polska',NULL,'/uploads/players/player-1770212072614-90257897.jpeg',NULL,NULL,NULL,NULL,NULL,1,'2026-02-04 12:15:52','2026-02-04 14:34:32');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `name_pl` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_pl` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'EUR',
  `category` enum('jersey','clothing','accessories','equipment','other') NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `sizes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`sizes`)),
  `colors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`colors`)),
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `season` varchar(20) NOT NULL,
  `matches_played` int(11) NOT NULL DEFAULT 0,
  `goals` int(11) NOT NULL DEFAULT 0,
  `assists` int(11) NOT NULL DEFAULT 0,
  `yellow_cards` int(11) NOT NULL DEFAULT 0,
  `red_cards` int(11) NOT NULL DEFAULT 0,
  `minutes_played` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `statistics_user_id_season` (`user_id`,`season`),
  CONSTRAINT `statistics_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `name_pl` varchar(100) DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `category` enum('u19','u17','u15','u13','u11','u9','u7','u6','u16','u14','u14A','u14B','u12','u10','veteran','bleus','dames') NOT NULL,
  `gender` enum('male','female','mixed') NOT NULL DEFAULT 'male',
  `season` varchar(20) NOT NULL,
  `description` text DEFAULT NULL,
  `description_pl` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `coach_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `coach_id` (`coach_id`),
  CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES
(1,'Les Bleus','Les Bleus','bleus','bleus','male','2026','Notre équipe senior masculine','Nasza męska drużyna seniorska','Our men senior team',NULL,NULL,NULL,1,'2026-01-05 17:31:40','2026-01-05 17:31:40'),
(2,'Les Dames','Les Dames','dames','dames','female','2026','Notre équipe senior féminine','Nasza żeńska drużyna seniorska','Our women senior team',NULL,NULL,NULL,1,'2026-01-05 17:31:40','2026-01-05 17:31:40'),
(3,'Olivier Giroud','Olivier Giroud','giroud','u16','male','2026','Juniors U16\r\nGarçons (2010/2011)','U16 Junior młodszy B2\r\nChłopcy (2010/2011)','U16 Juniors\r\nBoys (2010/2011)',NULL,NULL,NULL,1,'2026-01-05 17:31:40','2026-01-05 17:31:40'),
(4,'Désiré Doué','Désiré Doué','doue','u14A','male','2026','U14A\r\nGarçons (2012)','U14A Trampkarz C2\r\nChłopcy (2012)','U14A\r\nBoys (2012)',NULL,NULL,NULL,1,'2026-01-05 17:31:40','2026-01-05 17:31:40'),
(5,'Antoine Griezmann','Antoine Griezmann','griezmann','u13','male','2026','U13\r\nGarçons (2013)','U13 Młodzik D1\r\nChłopcy (2013)','U13\r\nBoys (2013)',NULL,NULL,NULL,1,'2026-01-05 17:31:40','2026-01-05 17:31:40'),
(6,'Kingsley Coman','Kingsley Coman','coman','u12','male','2026','U12\r\nGarçons (2014)','U12 Młodzik D2\r\nChłopcy (2014)','U12\r\nBoys (2014)',NULL,NULL,NULL,1,'2026-01-05 17:31:40','2026-01-05 17:31:40'),
(7,'Kylian Mbappé','Kylian Mbappé','mbappe','u14B','male','2026','U14B\r\nGarçons (2012)','U14B Trampkarz C2\r\nChłopcy (2012)','U14B\r\nBoys (2012)',NULL,NULL,NULL,1,'2026-01-05 17:31:40','2026-01-05 17:31:40'),
(8,'Kadidiatou Diani','Kadidiatou Diani','diani','u17','female','2026','Junior U17F\r\nFilles (2009-2012)','U17 Juniorki B1\r\nDziewczyny (2009-2012)','WU17 Junior\r\nGirls (2009-2012)',NULL,NULL,NULL,1,'2026-01-05 17:31:40','2026-01-05 17:31:40'),
(9,'Wendie Renard','Wendie Renard','renard','u13','female','2026','U13F\r\nFilles (2013/2014)','U13 Młodziczki D1\r\nDziewczyny (2013/2014)','WU13 \r\nGirls (2013/2014)',NULL,NULL,NULL,1,'2026-01-05 17:31:40','2026-01-05 17:31:40'),
(10,'Eugénie Le Sommer','Eugénie Le Sommer','le-sommer','u12','female','2026','U12F\r\nFilles (2014/2015)','U12 Młodziczki D2\r\nDziewczyny (2014/2015)','WU12\r\nGirls (2014/2015) ',NULL,NULL,NULL,1,'2026-01-05 17:31:40','2026-01-05 17:31:40'),
(11,'Amandine Henry','Amandine Henry','henry','u10','female','2026','U10F\r\nFilles (2016/2018)','U10 Orliczki E2\r\nDziewczyny (2016/2018)','WU10\r\nGirls (2016/2018)',NULL,NULL,NULL,1,'2026-01-05 17:31:40','2026-01-05 17:31:40'),
(12,'Ousmane Dembélé','Ousmane Dembélé','dembele','u9','male','2026','U9 Garçons (2017/2018)','U9 ak F1 Chopcy (2017/2018)','U9 Boys (2017/2018)',NULL,NULL,NULL,1,'2026-02-04 16:46:25','2026-02-04 16:46:25'),
(13,'William Saliba','William Saliba','saliba','u11','male','2026','U11 Garçons (2015/2016)','U11 Orlik E1 Chopcy (2015/2016)','U11 Boys (2015/2016)',NULL,NULL,NULL,1,'2026-02-04 16:49:58','2026-02-04 16:49:58'),
(14,'Eduardo Camavinga','Eduardo Camavinga','camavinga','u15','male','2026','U15 Garçons (2011)','U15 Trampkarzy C1 Chopcy (2011)','U15 Boys (2011)',NULL,NULL,NULL,1,'2026-02-05 10:11:35','2026-02-05 10:11:35');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','coach','player','member') NOT NULL DEFAULT 'member',
  `image_url` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `player_number` int(11) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `membership_status` enum('active','inactive','pending') NOT NULL DEFAULT 'pending',
  `membership_start_date` date DEFAULT NULL,
  `membership_end_date` date DEFAULT NULL,
  `preferred_language` enum('fr','pl') NOT NULL DEFAULT 'fr',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email` (`email`),
  UNIQUE KEY `users_username` (`username`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(15,'Wutezi','Stéphane','s.wutezi@wutezi.com','Owen94','$argon2id$v=19$m=65536,t=3,p=4$qWnq4DpiIFx7SI+kva9dtw$XxObJi0+kyV+S97xvY8im6/RojTBCOlBgAFkXqb2YwI','admin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'pending',NULL,NULL,'fr',1,'2026-01-07 13:19:30','2026-01-07 13:19:30'),
(19,'Hirtz','Pauline','pauline@kamiicode.com','Kamiicode','$argon2id$v=19$m=65536,t=3,p=4$7Rys8RePvy4rTTSnrlgVcw$zAE3WHfxj/Qt/qUBD6ETbeKJQEtEGZqvgSNJctOIyzg','admin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'pending',NULL,NULL,'fr',1,'2026-01-23 16:16:25','2026-01-23 16:16:25'),
(20,'Stawowy','Jakub','kubas1989@gmail.com','kubas1989','$argon2id$v=19$m=65536,t=3,p=4$F/vAUfUmZrmVm7SfuUt91A$mgvU6do7Ioe6xnfwgRdm4j6ZB7V91O0pv0XC1jGOqlY','member',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'pending',NULL,NULL,'pl',1,'2026-01-26 14:10:12','2026-01-26 14:10:12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-07 16:33:01
client@ik-019b03e2-2b9f-72ad-af7b-f7dfa89fbf97-6c696b6866-htc6b:~$ 
