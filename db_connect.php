<?php

$servername = "localhost";
$username = "root";     // MySQL username
$password = "";     // MySQL password
$database = "db1"; // MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
