 
<?php
// Allow requests from specific origin (replace * with your actual frontend URL in production)
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 86400"); // 1 day

// Respond to preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Continue with your POST request handling here
header("Content-Type: application/json");

// Assuming you have a MySQL database connection established
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "job";

// Create connection
$connection = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Decode JSON data from the request body
    $data = json_decode(file_get_contents("php://input"));

    // Extract email and password from the JSON data
    $email = isset($data->email) ? $connection->real_escape_string($data->email) : '';
    $password = isset($data->password) ? $connection->real_escape_string($data->password) : '';

    // Perform basic validation (you should add more validation and sanitization)
    if (!empty($email) && !empty($password)) {
        // Query to fetch user from database
        $query = "SELECT * FROM candidates WHERE email = '$email'";
        $result = $connection->query($query);

        if ($result && $result->num_rows > 0) {
            $user = $result->fetch_assoc();

            // Compare plain-text password
            if ($password === $user['password']) {

                $candidateId = $user['id']; // Assuming your candidate ID column name is 'id'
                $languagesQuery = "SELECT * FROM candidate_languages WHERE candidate_id =  $candidateId";
                $languagesResult = $connection->query($languagesQuery);
                if (!$languagesResult) {
                    die("Query failed: " . $connection->error);
                }
                // Fetch all languages into an array
                $languages = array();
                if ($languagesResult->num_rows > 0) {
                    while ($row = $languagesResult->fetch_assoc()) {
                        $languages[] = array(
                            "language" => $row['language'],
                            "level" => $row['level']
                        );
                    }
                }
                // Password matches, login successful
                $response = array(
                    "success" => true,
                    "message" => "Login successful",
                    "id" => $user['id'],
                    "username" => $user['username'],
                    "email" => $user['email'],
                    "password" => $user['password'],
                    "dob" => $user['dob'],
                    "sex" => $user['sex'],
                    "phone" => $user['phone'], 
                    "countryCode" => $user['countryCode'],
                    "jobInterest" => $user['jobInterest'],
                    "educationLevel" => $user['educationLevel'],
                   "nationality" => $user['nationality'],
                   "languages" => $languages,
                  //  "cvFile" => $user['cvFile'],
                    "redirect" => "/home"
                );
            } else {
                // Password does not match
                $response = array(
                    "success" => false,
                    "message" => "Invalid email or password"
                );
            }
        } else {
            // User not found
            $response = array(
                "success" => false,
                "message" => "Invalid email or password"
            );
        }
    } else {
        // Invalid input data
        $response = array(
            "success" => false,
            "message" => "Email and password are required"
        );
    }
} else {
    // Method not allowed
    http_response_code(405);
    $response = array("success" => false, "message" => "Method not allowed");
}

// Close database connection
$connection->close();

// Output the JSON response
echo json_encode($response);
?>




























