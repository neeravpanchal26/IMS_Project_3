<?php
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action = $_GET['action'];

if($action=='techEmployees')
{
    echo json_encode(DBHandler::AllocateEquipment_TechEmployees());
}
else if($action=='equipment')
{
    echo json_encode(DBHandler::AllocateEquipment_Equipments());
}
else if($action=='unassigned')
{
    $json=json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::AllocateEquipment_UnassignedEquipment($json->id));
}
else if($action=="allocate")
{   
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    echo json_encode(DBHandler::AllocateEquipment_Allocation($json->condition,$json->value,$json->equipmentID,$json->userID));
}
//else if ($action=='userequipment')
//{
//    $incoming = file_get_contents('php://input');
//    $json = json_decode($incoming);
//    echo json_encode(DBHandler::AllocateEquipment_GetUserEquipment($json->equipmentID));
//}