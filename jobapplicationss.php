<?php
// Database connection information
$host = 'localhost'; // Your database host
$dbname = 'job'; // Your database name
$username = 'root'; // Your database username
$password = ''; // Your database password

// Data for the new job application
$company_id = 1; // Example company ID
$job_id = 1; // Example job ID (ensure this exists in jobadvertisement table)
$candidate_id = 3; // Example candidate ID

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check if the job_id exists in jobadvertisement table
    $stmt_check = $pdo->prepare("SELECT COUNT(*) FROM jobadvertisement WHERE job_id = :job_id");
    $stmt_check->bindParam(':job_id', $job_id, PDO::PARAM_INT);
    $stmt_check->execute();
    
    $count = $stmt_check->fetchColumn();
    
    if ($count == 0) {
        throw new Exception("Job ID $job_id does not exist in jobadvertisement table.");
    }
    
    // Prepare SQL statement to insert a new job application
    $sql = "INSERT INTO jobapplications (company_id, job_id, candidate_id) VALUES (:company_id, :job_id, :candidate_id)";
    $stmt = $pdo->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(':company_id', $company_id, PDO::PARAM_INT);
    $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
    $stmt->bindParam(':candidate_id', $candidate_id, PDO::PARAM_INT);
    
    // Execute the prepared statement
    $stmt->execute();
    
    echo "New job application added successfully.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

// Close connection
$pdo = null;
?>
