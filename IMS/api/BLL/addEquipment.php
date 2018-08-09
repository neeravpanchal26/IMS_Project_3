<?php
require_once '../BLL/CORS_Headers.php';

require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action = $_GET['action'];

if($action == 'brand')
{
    echo json_encode(DBHandler::AddEquipment_Brand());
}
else if($action == 'status')
{
    echo json_encode(DBHandler::AddEquipment_Status());
}
else if($action=='users')
{
    echo json_encode(DBHandler::AddEquipment_Users());
}
else if ($action=='types')
{
    echo json_encode(DBHandler::AddEquipment_Types());
}
else if ($action=='condition')
{
    echo json_encode(DBHandler::AddEquipment_Conditions());
}
else if ($action=='section')
{
    echo json_encode(DBHandler::AddEquipment_Section());
}
else if($action=='suppliers')
{
    echo json_encode(DBHandler::AddEquipment_Suppliers());
}
else if ($action == 'insert') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    if ($display = DBHandler::AddEquipment_Insert($json->name, $json->desc, $json->cost, $json->equipmentCondition, $json->brand, $json->section,$json->type, $json->dateReceived,$json->barcode,$json->supplier)) {
        $response=$display;
    } else {
        $response=$display;
    }
    echo json_encode($response);
}
?>