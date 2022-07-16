<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/08/31
 * Time: 15:16
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];

if ($action == 'condition') {
    echo json_encode(DBHandler::MaintainEquipment_Condition());
} elseif ($action == 'equipments') {
    $userID = $_GET['userID'];
    echo json_encode(DBHandler::MaintainEquipmentByID($userID));
} elseif ($action == 'individualInfo') {
    $serial = $_GET['serial'];
    echo json_encode(DBHandler::MaintainEquipmentBySerial($serial));
} elseif ($action == 'individualInfoImage') {
    $serial = $_GET['serial'];
    echo DBHandler::MaintainEquipmentBySerial_Image($serial);
} elseif ($action == 'insert') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::MaintainEquipment_Insert($json->userID, $json->serial, $json->condition, $json->value, $json->status, $json->description));
} elseif ($action == 'imageUpload') {
    $serial = $_POST['serial'];
    // Get Temp Path
    $tempPath = $_FILES['file']['tmp_name'];
    // Get File Name
    $actualName = $_FILES['file']['name'];
    // New path
    $actualPath = '../uploads/' . $actualName;
    // Move File into new path
    move_uploaded_file($tempPath, $actualPath);
    // Get real path of moved file here
    $realPath = realpath(__DIR__ . '/' . $actualPath);
    // Execute the non query
    echo json_encode(DBHandler::MaintainEquipment_InsertImage($actualPath, $serial));
    // Delete the file
    unlink($realPath);
}