<?php
header('Access-Control-Allow-Methods:GET,PUT,POST,DELETE');
header('Access-Control-Allow-Headers:Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$tempPath = $_FILES['file']['tmp_name'];

$actualName = $_FILES['file']['name'];

$actualPath = '../uploads/'.$actualName;

move_uploaded_file($tempPath,$actualPath);

$realpath =  realpath(__DIR__ .'/'.$actualPath);

echo json_encode(DBHandler::AddEquipment_UploadImage($actualPath));

unlink($realpath);








?>