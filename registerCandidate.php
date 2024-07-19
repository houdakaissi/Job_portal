
<?php
 
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST"); // Specify the allowed HTTP methods
header("Access-Control-Allow-Headers: Content-Type"); // Specify the allowed headers

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
$username = $postData['username'];
$email = $postData['email'];
$password = $postData['password'];
$dob = $postData['dob'];
$sex = $postData['sex'];
$phone = $postData['phone'];
$countryCode = $postData['countryCode'];
$jobInterest = $postData['jobInterest'];
$educationLevel = $postData['educationLevel'];
$nationality = $postData['nationality'];
$languages = $postData['languages']; // This will be an array of objects

 
//$sql = "INSERT into fileup(title,image) VALUES('$title','$pname')";
$stmt = $conn->prepare("INSERT INTO candidates (username, email, password, dob, sex, phone, countryCode, jobInterest, educationLevel, nationality) VALUES (?,?  ,?, ?, ?, ?, ?,  ?, ?, ?)");
$stmt->bind_param("ssssssssss", $username, $email, $password, $dob, $sex, $phone, $countryCode, $jobInterest, $educationLevel, $nationality);

// Execute the statement
$stmt->execute();

// Get the ID of the inserted record for languages
$candidate_id = $stmt->insert_id;

// Insert languages into another table
foreach ($languages as $language) {
  $lang = $language['language'];
  $level = $language['level'];
  
  $stmt2 = $conn->prepare("INSERT INTO candidate_languages (candidate_id, language, level) VALUES (?, ?, ?)");
  $stmt2->bind_param("iss", $candidate_id, $lang, $level);
  $stmt2->execute();
}

$stmt->close();
$conn->close();

echo json_encode(array("message" => "Registration success"));
?>



