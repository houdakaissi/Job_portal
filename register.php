<?php
header('Access-Control-Allow-Origin: *');  // Replace * with your frontend URL during production
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Include database connection
    include 'db_connect.php';

    // Initialize response array
    $response = array();

    try {
        // Prepare and bind POST data
        $stmt = $conn->prepare("INSERT INTO employees (username, password, presentation, address, zipCode, city, country, email, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssss", $username, $password, $presentation, $address, $zipCode, $city, $country, $email, $phoneNumber);

        // Set parameters from POST request
        $username = isset($_POST["username"]) ? $_POST["username"] : null;
        $password = isset($_POST["password"]) ? password_hash($_POST["password"], PASSWORD_DEFAULT) : null; // Hash password for security
        $presentation = isset($_POST["presentation"]) ? $_POST["presentation"] : null;
        $address = isset($_POST["address"]) ? $_POST["address"] : null;
        $zipCode = isset($_POST["zipCode"]) ? $_POST["zipCode"] : null;
        $city = isset($_POST["city"]) ? $_POST["city"] : null;
        $country = isset($_POST["country"]) ? $_POST["country"] : null;
        $email = isset($_POST["email"]) ? $_POST["email"] : null;
        $phoneNumber = isset($_POST["phoneNumber"]) ? $_POST["phoneNumber"] : null;

        // Validate required fields
        if (!$username || !$password || !$email || !$phoneNumber) {
            $response = array("status" => "error", "message" => "Please fill in all required fields.");
        } else {
            // Execute prepared statement
            if ($stmt->execute()) {
                // Registration successful
                $response = array("status" => "success", "message" => "Registration successful");
            } else {
                // Registration failed
                $response = array("status" => "error", "message" => "Registration failed");
            }
        }
    } catch (Exception $e) {
        // Exception occurred
        $response = array("status" => "error", "message" => "Exception: " . $e->getMessage());
    }

    // Close statement and connection
    if (isset($stmt)) {
        $stmt->close();
    }
    $conn->close();

    // Send JSON response
    echo json_encode($response);
}
?>
