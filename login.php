<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Prepare and bind POST data
    $stmt = $conn->prepare("SELECT * FROM employees WHERE email = ?");
    $stmt->bind_param("s", $email);

    // Set parameters from POST request
    $email = $_POST["email"];

    // Execute prepared statement
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $employee = $result->fetch_assoc();
        if (password_verify($_POST["password"], $employee["password"])) {
            // Password is correct, login successful
            $response = array("status" => "success", "message" => "Login successful");
        } else {
            // Password is incorrect
            $response = array("status" => "error", "message" => "Incorrect password");
        }
    } else {
        // User with email not found
        $response = array("status" => "error", "message" => "User not found");
    }

    // Send JSON response
    header('Content-Type: application/json');
    echo json_encode($response);

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
