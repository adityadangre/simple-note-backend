-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2019 at 06:25 PM
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
  `name` varchar(20) NOT NULL,
  `icon` varchar(30) NOT NULL,
  `color` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `icon`, `color`) VALUES
(0, 'Works', 'build', '#2FC2DF'),
(1, 'Books', 'book', '#FAD06C'),
(2, 'Movies', 'videocam', '#C0EB6A'),
(3, 'Links', 'link', '#b4b5b4'),
(24, 'To-do', 'walk', '#FF92A9'),
(29, 'Personal', 'person', ''),
(30, 'Learn', 'book', '');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `note` varchar(100) NOT NULL,
  `time` varchar(20) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `note`, `time`, `category_id`) VALUES
(4, 'Everything is F*cked', 'A Book About Hope', '2019-06-20', 1),
(5, 'The Subtle Art of Not Giving a F*ck', 'A Counterintuitive Approach to Living a Good Life', '2019-06-20', 1),
(6, 'Forrest Gump', '1994 American comedy-drama film based on the 1986 novel of the same name by Winston Groom', '2019-06-20', 2),
(7, 'Pay It Forward', '2000 American romantic drama film directed by Mimi Leder', '2019-06-20', 2),
(8, 'Practice Programming', 'codewars.com', '2019-06-20', 3),
(9, 'Practice Programming', 'hackerrank.com', '2019-06-20', 3),
(10, 'Practice Programming', 'codility.com', '2019-06-20', 3),
(11, 'Practice Programming', 'test4geek.com', '2019-06-20', 3),
(12, 'Job Vacancy', 'glassdoor.com', '2019-06-20', 3),
(13, 'Job Vacancy\'s', 'jobstreet.com', '2019-06-20', 3),
(14, 'Job Vacancy', 'kalibrr.id', '2019-06-20', 3),
(15, 'Donor Darah', 'Jam 10am, di PMI Kota Bandung', '2019-06-20', 4),
(16, 'Merapikan Dokumen', 'Jam 1pm', '2019-06-20', 4),
(17, 'Baca Buku', 'Apasaja, Jam 3pm', '2019-06-20', 4),
(30, 'Sunday Morning', 'UGM, 9am', '2019-07-06', 24),
(31, 'Jogging', 'Sunday, 5am - 7am\nHome to Malioboro', '2019-07-06', 24),
(33, 'Panjang', 'It was the only one of my resume and a good day to you soon love you so very sorry to bother to you ', '2019-07-06', 24),
(38, 'Infinite Scrolls', 'So the scrolling no worries and I\'ll see what happens to me as well so that the github the github', '2019-07-06', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
