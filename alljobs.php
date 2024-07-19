<?php
header("Content-Type: application/json"); // Set the content type to JSON
header("Access-Control-Allow-Origin: *"); // Allow all origins or specify the exact origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database connection parameters
$host = 'localhost';     // Database host
$dbname = 'job'; // Database name
$username = 'root'; // Database username
$password = ''; // Database password

// Create a new PDO instance
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare and execute the SQL query to fetch all records from the jobadvertisement table
    $stmt = $pdo->prepare("SELECT * FROM jobadvertisement");
    $stmt->execute();

    // Fetch all results
    $jobAdvertisements = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Modify language_levels to ensure it is an array
    foreach ($jobAdvertisements as &$data) {
        if (is_string($data['language_levels'])) {
            $data['language_levels'] = json_decode($data['language_levels'], true);
        }
    }

    // Return the data as JSON
    echo json_encode($jobAdvertisements);

} catch (PDOException $e) {
    // Return an error as JSON
    echo json_encode(['error' => $e->getMessage()]);
}

// Close the database connection
$pdo = null;
?>
