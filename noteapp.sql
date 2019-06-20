-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2019 at 06:32 AM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `noteapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(4, 'Works'),
(5, 'Books'),
(6, 'Movies'),
(7, 'Links'),
(8, 'To-do');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `note` varchar(100) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `note`, `time`, `category_id`) VALUES
(4, 'Everything is Fucked', 'A Book About Hope', '2019-06-19 17:00:00', 5),
(5, 'The Subtle Art of Not Giving a Fuck', 'A Counterintuitive Approach to Living a Good Life', '2019-06-19 17:00:00', 5),
(6, 'Forrest Gump', '1994 American comedy-drama film based on the 1986 novel of the same name by Winston Groom', '2019-06-19 17:00:00', 6),
(7, 'Pay It Forward', '2000 American romantic drama film directed by Mimi Leder', '2019-06-19 17:00:00', 6),
(8, 'Practice Programming', 'codewars.com', '2019-06-20 00:28:19', 7),
(9, 'Practice Programming', 'hackerrank.com', '2019-06-20 00:28:19', 7),
(10, 'Practice Programming', 'codility.com', '2019-06-20 00:28:58', 7),
(11, 'Practice Programming', 'test4geek.com', '2019-06-20 00:28:58', 7),
(12, 'Job Vacancy', 'glassdoor.com', '2019-06-20 00:31:50', 7),
(13, 'Job Vacancy', 'jobstreet.com', '2019-06-20 00:31:50', 7),
(14, 'Job Vacancy', 'kalibrr.id', '2019-06-20 00:33:05', 7),
(15, 'Donor Darah', 'Jam 10am, di PMI Kota Bandung', '2019-06-20 00:33:05', 8),
(16, 'Merapikan Dokumen', 'Jam 1pm', '2019-06-20 00:35:12', 8),
(17, 'Baca Buku', 'Apasaja, Jam 3pm', '2019-06-20 00:35:12', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
