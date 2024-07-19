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

// Get the job ID from the query parameters
$jobId = isset($_GET['job_id']) ? (int)$_GET['job_id'] : 0; // Use job_id

if ($jobId <= 0) {
    echo json_encode(['error' => 'Invalid job ID']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare and execute the SQL query to fetch details of a specific job
    $stmt = $pdo->prepare("SELECT * FROM jobadvertisement WHERE job_id = ?");
    $stmt->execute([$jobId]);

    // Fetch the result
    $jobAdvertisement = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($jobAdvertisement) {
        // Modify language_levels to ensure it is an array
        if (is_string($jobAdvertisement['language_levels'])) {
            $jobAdvertisement['language_levels'] = json_decode($jobAdvertisement['language_levels'], true);
        }
        // Return the data as JSON
        echo json_encode($jobAdvertisement);
    } else {
        echo json_encode(['error' => 'Job not found']);
    }

} catch (PDOException $e) {
    // Return an error as JSON
    echo json_encode(['error' => $e->getMessage()]);
}

// Close the database connection
$pdo = null;
?>
