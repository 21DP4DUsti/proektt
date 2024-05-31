<?php
// Подключение к базе данных
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "sneaker_auction";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных о кроссовках из формы
    $name = $_POST['name'];
    $brand = $_POST['brand'];
    $model = $_POST['model'];
    $size = $_POST['size'];
    $color = $_POST['color'];
    $release_date = $_POST['release_date'];
    $retail_price = $_POST['retail_price'];
    $description = $_POST['description'];
    $image_url = $_POST['image_url'];

    // Подготовка SQL запроса
    $sql = "INSERT INTO sneakers (name, brand, model, size, color, release_date, retail_price, description, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    // Подготовка и выполнение запроса
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssdss", $name, $brand, $model, $size, $color, $release_date, $retail_price, $description, $image_url);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Sneaker added successfully!";
    } else {
        echo "Error adding sneaker: " . $conn->error;
    }

    // Закрытие запроса
    $stmt->close();
}

// Закрытие соединения
$response = array('success' => true, 'id' => $newSneakerId); // $newSneakerId - ID нового кроссовка из базы данных

// Если произошла ошибка
// $response = array('success' => false, 'error' => 'Описание ошибки');

header('Content-Type: application/json');
echo json_encode($response);
$conn->close();
?>