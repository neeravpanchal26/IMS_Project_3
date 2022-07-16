<?php
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];

if ($action == 'techEmployees') {
    echo json_encode(DBHandler::AllocateEquipment_TechEmployees());
} else if ($action == 'info') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::AllocateEquipment_GetEquipmentInfo($json->id));
} else if ($action == "allocate") {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    echo json_encode(DBHandler::AllocateEquipment_Allocation($json->desc, $json->alType, $json->equipmentID, $json->userID));
} else if ($action == 'image') {
    $json = json_decode(file_get_contents('php://input'));
    echo DBHandler::AllocateEquipment_GetEquipmentPicture($json->id);
} else if ($action == 'types') {
    echo json_encode(DBHandler::AllocateEquipment_GetAllocationTypes());
}