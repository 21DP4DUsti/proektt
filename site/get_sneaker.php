<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "sneaker_auction";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sneaker_id = $_GET['id'];

$sql = "SELECT * FROM sneakers WHERE sneaker_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $sneaker_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(["error" => "No sneaker found"]);
}

$stmt->close();
$conn->close();
?>