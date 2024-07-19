

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

$password = $postData['password'];
$presentation_text = $postData['presentation_text'];
$address= $postData['address'];
$zip_code = $postData['zip_code'];
$city = $postData['city'];
$country= $postData['country'];
$email = $postData['email'];
$phone = $postData['phone'];

/*
//$logo_path = $postData['logo_path']; // This will be an array of objects
$file_name = $_FILES['image']['name'];
$tempname = $_FILES['image']['tmp_name'];
$uploadDir = 'images/'.$file_name;
$uploadFile = $uploadDir . basename($logo['name']);
*/
/*
if(move_uploaded_file($tempname,$folder)){
echo"yes";
}else{
echo "no";
}
 */
//$sql = "INSERT into fileup(title,image) VALUES('$title','$pname')";
$stmt = $conn->prepare("INSERT INTO companies (username, password, presentation_text, address, zip_code, city, country,phone, email) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("sssssssss", $username,  $password, $presentation_text, $address, $zip_code, $city, $country, $phone, $email);

// Execute the statement
$stmt->execute();

// Get the ID of the inserted record for languages
$candidate_id = $stmt->insert_id;
/*
// Insert languages into another table
foreach ($languages as $language) {
  $lang = $language['language'];
  $level = $language['level'];
  
  $stmt2 = $conn->prepare("INSERT INTO candidate_languages (candidate_id, language, level) VALUES (?, ?, ?)");
  $stmt2->bind_param("iss", $candidate_id, $lang, $level);
  $stmt2->execute();
}
*/
$stmt->close();
$conn->close();

echo json_encode(array("message" => "Registration success"));
?>




