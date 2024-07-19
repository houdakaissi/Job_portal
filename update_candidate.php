<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// MySQL database credentials
$servername = "localhost";
$username = "root";
$password = "";
$database = "Job";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve POST data from React application
$postData = json_decode(file_get_contents("php://input"), true);

// Extract data from POST
$candidate_id = isset($postData['id']) ? $postData['id'] : null;
$username = isset($postData['username']) ? $postData['username'] : null;
$password = isset($postData['password']) ? $postData['password'] : null;
$email = isset($postData['email']) ? $postData['email'] : null;
$dob = isset($postData['dob']) ? $postData['dob'] : null;
$sex = isset($postData['sex']) ? $postData['sex'] : null;
$phone = isset($postData['phone']) ? $postData['phone'] : null;
$countryCode = isset($postData['countryCode']) ? $postData['countryCode'] : null;
$jobInterest = isset($postData['jobInterest']) ? $postData['jobInterest'] : null;
$educationLevel = isset($postData['educationLevel']) ? $postData['educationLevel'] : null;
$nationality = isset($postData['nationality']) ? $postData['nationality'] : null;
$languages = isset($postData['languages']) ? $postData['languages'] : [];

// Update candidates table
$stmt = $conn->prepare("UPDATE candidates SET username=?, email=?, password=?, dob=?, sex=?, phone=?, countryCode=?, jobInterest=?, educationLevel=?, nationality=? WHERE id=?");
$stmt->bind_param("ssssssssssi", $username, $email, $password, $dob, $sex, $phone, $countryCode, $jobInterest, $educationLevel, $nationality, $candidate_id);
$stmt->execute();

if ($stmt->error) {
    die("Error during update: " . $stmt->error);
}

// Delete existing languages for this candidate
$stmt_delete_languages = $conn->prepare("DELETE FROM candidate_languages WHERE candidate_id=?");
$stmt_delete_languages->bind_param("i", $candidate_id);
$stmt_delete_languages->execute();

// Insert updated languages
foreach ($languages as $language) {
    $lang = $language['language'];
    $level = $language['level'];
    
    $stmt_insert_languages = $conn->prepare("INSERT INTO candidate_languages (candidate_id, language, level) VALUES (?, ?, ?)");
    $stmt_insert_languages->bind_param("iss", $candidate_id, $lang, $level);
    $stmt_insert_languages->execute();
}

$stmt->close();
$stmt_delete_languages->close();
$stmt_insert_languages->close();
$conn->close();

echo json_encode(array("message" => "Update successful"));
?>
