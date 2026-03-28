-- Advanced SaaS-Based Hostel Management System Database Schema

-- Set SQL Mode and Timezone
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table: `plans` (SaaS Subscription Plans)
CREATE TABLE `plans` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `monthly_price` decimal(10,2) NOT NULL,
  `yearly_price` decimal(10,2) NOT NULL,
  `max_hostels` int(11) NOT NULL DEFAULT 1,
  `max_tenants` int(11) NOT NULL DEFAULT 50,
  `features` json DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `tenants` (SaaS Tenants / Customers who own hostels)
CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `domain` varchar(255) UNIQUE DEFAULT NULL,
  `owner_first_name` varchar(100) NOT NULL,
  `owner_last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `phone` varchar(30) DEFAULT NULL,
  `plan_id` bigint(20) UNSIGNED DEFAULT NULL,
  `subscription_status` enum('active','trial','suspended','cancelled') DEFAULT 'trial',
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `roles` 
CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `permissions` json DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `users`
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) UNSIGNED DEFAULT NULL,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `hostels`
CREATE TABLE `hostels` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('boys','girls','coed') NOT NULL,
  `address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `country` varchar(100) NOT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(30) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `property_managers`
CREATE TABLE `property_managers` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL, -- Optional link to users table
  `name` varchar(255) NOT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT 'Male',
  `phone` varchar(20) NOT NULL,
  `alt_mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `marital_status` enum('Single','Married','Other') DEFAULT 'Single',
  -- Address
  `current_address_1` varchar(255) DEFAULT NULL,
  `current_address_2` varchar(255) DEFAULT NULL,
  `current_city` varchar(100) DEFAULT NULL,
  `current_state` varchar(100) DEFAULT NULL,
  `current_pincode` varchar(10) DEFAULT NULL,
  `current_country` varchar(100) DEFAULT 'India',
  `permanent_address_1` varchar(255) DEFAULT NULL,
  `permanent_address_2` varchar(255) DEFAULT NULL,
  `permanent_city` varchar(100) DEFAULT NULL,
  `permanent_state` varchar(100) DEFAULT NULL,
  `permanent_pincode` varchar(10) DEFAULT NULL,
  -- KYC
  `aadhaar_number` varchar(20) DEFAULT NULL,
  `pan_number` varchar(20) DEFAULT NULL,
  `other_id_proof` varchar(100) DEFAULT NULL,
  -- Employment
  `employee_id` varchar(50) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `job_role` varchar(100) DEFAULT 'Property Manager',
  `work_shift` enum('Morning','Evening','Full Day') DEFAULT 'Morning',
  `salary` decimal(10,2) DEFAULT NULL,
  -- Education
  `highest_qualification` varchar(100) DEFAULT NULL,
  `college_name` varchar(255) DEFAULT NULL,
  `year_of_passing` varchar(10) DEFAULT NULL,
  `certification` text,
  -- Bank
  `account_holder_name` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(50) DEFAULT NULL,
  `ifsc_code` varchar(20) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `upi_id` varchar(100) DEFAULT NULL,
  -- Emergency
  `emergency_contact_name` varchar(255) DEFAULT NULL,
  `emergency_relationship` varchar(100) DEFAULT NULL,
  `emergency_mobile` varchar(20) DEFAULT NULL,
  `emergency_address` text,
  -- Login
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'Property Manager',
  -- System
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `housekeepers`
CREATE TABLE `housekeepers` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `hostel_id` bigint(20) UNSIGNED DEFAULT NULL, -- Should null if assigned to property_manager or building
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `alt_mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT 'Female',
  `dob` date DEFAULT NULL,
  `marital_status` enum('Single','Married','Other') DEFAULT 'Single',
  -- Address
  `current_address` text,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `permanent_address` text,
  `landmark` varchar(255) DEFAULT NULL,
  -- Identity
  `aadhaar_number` varchar(20) DEFAULT NULL,
  `pan_number` varchar(20) DEFAULT NULL,
  `police_verification_status` enum('Pending','Verified','In Progress','Rejected') DEFAULT 'Pending',
  -- Employment
  `employee_id` varchar(50) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `shift` enum('Morning','Evening','Night') DEFAULT 'Morning',
  `working_area` varchar(255) DEFAULT NULL,
  `employment_type` enum('Full Time','Part Time','Contract') DEFAULT 'Full Time',
  `salary` decimal(10,2) DEFAULT NULL,
  `weekly_off` varchar(20) DEFAULT 'Sunday',
  `supervisor` varchar(255) DEFAULT NULL,
  -- Bank
  `bank_name` varchar(255) DEFAULT NULL,
  `account_holder_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(50) DEFAULT NULL,
  `ifsc_code` varchar(20) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `upi_id` varchar(100) DEFAULT NULL,
  -- Emergency
  `emergency_name` varchar(255) DEFAULT NULL,
  `relationship` varchar(100) DEFAULT NULL,
  `emergency_mobile` varchar(20) DEFAULT NULL,
  `emergency_address` text,
  -- Additional
  `work_experience` int DEFAULT NULL,
  `previous_workplace` varchar(255) DEFAULT NULL,
  `health_issues` text,
  `notes` text,
  -- System
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`hostel_id`) REFERENCES `hostels`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `hostel_amenities`
CREATE TABLE `hostel_amenities` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `hostel_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `icon` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`hostel_id`) REFERENCES `hostels`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `buildings` (Blocks/Buildings within a hostel)
CREATE TABLE `buildings` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `hostel_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `number_of_floors` int(11) DEFAULT 1,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`hostel_id`) REFERENCES `hostels`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `room_types`
CREATE TABLE `room_types` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `hostel_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `deposit_amount` decimal(10,2) DEFAULT 0.00,
  `capacity` int(11) NOT NULL,
  `description` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`hostel_id`) REFERENCES `hostels`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `rooms`
CREATE TABLE `rooms` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `building_id` bigint(20) UNSIGNED NOT NULL,
  `room_type_id` bigint(20) UNSIGNED NOT NULL,
  `room_number` varchar(50) NOT NULL,
  `floor_number` int(11) DEFAULT 0,
  `current_occupancy` int(11) DEFAULT 0,
  `occupancy_status` enum('available','partially_occupied','full','maintenance') DEFAULT 'available',
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`building_id`) REFERENCES `buildings`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`room_type_id`) REFERENCES `room_types`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `beds`
CREATE TABLE `beds` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `bed_number` varchar(50) NOT NULL,
  `occupancy_status` enum('available','occupied','maintenance') DEFAULT 'available',
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `residents` (Students/Working Professionals staying)
CREATE TABLE `residents` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(30) NOT NULL,
  `alt_phone` varchar(30) DEFAULT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `marital_status` enum('Single','Married','Other') DEFAULT 'Single',
  `id_proof_type` enum('Aadhaar Card','PAN Card','Passport','Driving License') NOT NULL,
  `id_proof_number` varchar(100) NOT NULL,
  `id_proof_document_path` varchar(255) DEFAULT NULL,
  `current_address_line` text NOT NULL,
  `current_city` varchar(100) DEFAULT NULL,
  `current_state` varchar(100) DEFAULT NULL,
  `current_pincode` varchar(20) DEFAULT NULL,
  `permanent_address_line` text NOT NULL,
  `permanent_city` varchar(100) DEFAULT NULL,
  `permanent_state` varchar(100) DEFAULT NULL,
  `permanent_pincode` varchar(20) DEFAULT NULL,
  `guardian_name` varchar(100) DEFAULT NULL,
  `guardian_phone` varchar(30) DEFAULT NULL,
  `emergency_contact_name` varchar(100) NOT NULL,
  `emergency_contact_phone` varchar(30) NOT NULL,
  `emergency_contact_relation` varchar(50) DEFAULT NULL,
  `emergency_contact_address` text,
  `institution_workplace` varchar(255) DEFAULT NULL, -- Company or College
  `designation` varchar(100) DEFAULT NULL,
  `office_address` text,
  `office_contact` varchar(30) DEFAULT NULL,
  `blood_group` varchar(10) DEFAULT NULL,
  `residence_type` enum('Long Stay','Short Stay','Corporate','Guest') DEFAULT 'Long Stay',
  `residence_status` enum('Active','Past','Banned') DEFAULT 'Active',
  `police_verification` enum('Pending','Verified','Partial') DEFAULT 'Pending',
  `remarks` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `bookings`
CREATE TABLE `bookings` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `resident_id` bigint(20) UNSIGNED NOT NULL,
  `bed_id` bigint(20) UNSIGNED NOT NULL,
  `hostel_id` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `actual_checkout_date` date DEFAULT NULL,
  `rent_cycle` enum('Daily','Monthly','Yearly') DEFAULT 'Monthly',
  `rent_amount` decimal(10,2) NOT NULL,
  `security_deposit` decimal(10,2) DEFAULT 0.00,
  `booking_status` enum('pending','active','completed','cancelled') DEFAULT 'pending',
  `notes` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`resident_id`) REFERENCES `residents`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`bed_id`) REFERENCES `beds`(`id`) ON DELETE RESTRICT,
  FOREIGN KEY (`hostel_id`) REFERENCES `hostels`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`added_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `invoices`
CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `hostel_id` bigint(20) UNSIGNED NOT NULL,
  `resident_id` bigint(20) UNSIGNED NOT NULL,
  `booking_id` bigint(20) UNSIGNED DEFAULT NULL,
  `invoice_number` varchar(100) NOT NULL UNIQUE,
  `type` enum('rent','deposit','maintenance','fine','other') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT 0.00,
  `tax` decimal(10,2) DEFAULT 0.00,
  `total_amount` decimal(10,2) NOT NULL,
  `amount_paid` decimal(10,2) DEFAULT 0.00,
  `due_date` date NOT NULL,
  `payment_status` enum('unpaid','partial','paid','overdue','cancelled') DEFAULT 'unpaid',
  `description` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`hostel_id`) REFERENCES `hostels`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`resident_id`) REFERENCES `residents`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `payments`
CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('cash','card','bank_transfer','upi','online_gateway') NOT NULL,
  `transaction_reference` varchar(255) DEFAULT NULL,
  `payment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_status` enum('success','failed','pending','refunded') DEFAULT 'success',
  `received_by` bigint(20) UNSIGNED DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`received_by`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`added_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `maintenance_requests`
CREATE TABLE `maintenance_requests` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `hostel_id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED DEFAULT NULL,
  `resident_id` bigint(20) UNSIGNED DEFAULT NULL,
  `issue_type` varchar(100) NOT NULL,
  `priority` enum('low','medium','high','urgent') DEFAULT 'medium',
  `description` text NOT NULL,
  `attachment_path` varchar(255) DEFAULT NULL,
  `request_status` enum('pending','in_progress','resolved','closed') DEFAULT 'pending',
  `assigned_to` bigint(20) UNSIGNED DEFAULT NULL,
  `resolved_at` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`hostel_id`) REFERENCES `hostels`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`resident_id`) REFERENCES `residents`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `visitors`
CREATE TABLE `visitors` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `hostel_id` bigint(20) UNSIGNED NOT NULL,
  `resident_id` bigint(20) UNSIGNED DEFAULT NULL,
  `visitor_name` varchar(100) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `relation` varchar(50) DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `id_proof_type` varchar(50) DEFAULT NULL,
  `id_proof_number` varchar(100) DEFAULT NULL,
  `check_in_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `check_out_time` timestamp NULL DEFAULT NULL,
  `visitor_status` enum('in','out') DEFAULT 'in',
  `recorded_by` bigint(20) UNSIGNED DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`hostel_id`) REFERENCES `hostels`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`resident_id`) REFERENCES `residents`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`recorded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: `attendance` (Daily log for residents)
-- Attendance and Leave tables removed for corporate employees.


-- --------------------------------------------------------
-- Table: `notices` (Announcements)
CREATE TABLE `notices` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `hostel_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `notice_type` enum('general','urgent','event','maintenance') DEFAULT 'general',
  `is_active` boolean DEFAULT true,
  `status` enum('active','inactive') DEFAULT 'active',
  `added_by` bigint(20) UNSIGNED DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`hostel_id`) REFERENCES `hostels`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`added_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;
