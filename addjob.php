<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (you may want to restrict this to specific domains)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header

// Database connection parameters
$servername = "localhost"; // Replace with your server name
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$database = "job"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data from request body
$data = json_decode(file_get_contents('php://input'), true);

// Check if data is valid
if (is_array($data)) {
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO JobAdvertisement (company_id, description, salary_level, city, country, education_level, language_levels) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }
    
    // Bind parameters
    $company_id = $data['company_id'];
    $description = $data['description'];
    $salary_level = $data['salary_level'];
    $city = $data['city'];
    $country = $data['country'];
    $education_level = $data['education_level'];
    $language_levels = json_encode($data['language_levels']); // Encode array to JSON string
    
    // Bind parameters to the prepared statement
    $stmt->bind_param("issssss", $company_id, $description, $salary_level, $city, $country, $education_level, $language_levels);
    
    // Execute the statement
    if ($stmt->execute()) {
        echo "New job advertisement added successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
    
    // Close the statement
    $stmt->close();
} else {
    echo "Invalid input data";
}

// Close the connection
$conn->close();
?>
