<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (you may want to restrict this to specific domains)
header("Access-Control-Allow-Methods: GET, OPTIONS"); // Allow GET and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "job";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the company_id from the query parameters
$company_id = isset($_GET['company_id']) ? intval($_GET['company_id']) : 0;

// Validate company_id
if ($company_id > 0) {
    // Prepare and bind
    $stmt = $conn->prepare("SELECT company_id, description, salary_level, city, country, education_level, language_levels FROM JobAdvertisement WHERE company_id = ?");
    
    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }

    // Bind parameters
    $stmt->bind_param("i", $company_id);
    
    // Execute the statement
    $stmt->execute();
    
    // Fetch the results
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Fetch all rows as an associative array
        $data = $result->fetch_all(MYSQLI_ASSOC);
        
        // Output the results as JSON
        echo json_encode($data);
    } else {
        echo json_encode(array("message" => "No records found for company_id: $company_id"));
    }
    
    // Close the statement
    $stmt->close();
} else {
    echo json_encode(array("message" => "Invalid company_id"));
}

// Close the connection
$conn->close();
?>
