<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "loved_ones_memorial";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM uploads";
$result = $conn->query($sql);

$uploads = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $uploads[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($uploads);
?>
