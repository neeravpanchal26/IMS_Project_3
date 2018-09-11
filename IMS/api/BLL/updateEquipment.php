<?php
require_once '../BLL/CORS_Headers.php';

require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];
if ($action == 'brand') {
    echo json_encode(DBHandler::AddEquipment_Brand());
} else if ($action == 'users') {
    echo json_encode(DBHandler::AddEquipment_Users());
} else if ($action == 'types') {
    echo json_encode(DBHandler::AddEquipment_Types());
} else if ($action == 'section') {
    echo json_encode(DBHandler::AddEquipment_Section());
} else if ($action == 'suppliers') {
    echo json_encode(DBHandler::AddEquipment_Suppliers());
} else if ($action == 'getEquipmentDetails') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    echo json_encode(DBHandler::UpdateEquipment_GetEquipmentDetailsViaID($json->id));
} else if ($action == 'updateEquipment') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    echo json_encode(DBHandler::UpdateEquipment_UpdateEquipment($json->id, $json->name, $json->desc, $json->brand, $json->section, $json->type, $json->supplier));
}