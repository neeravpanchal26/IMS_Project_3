<?php
header('Access-Control-Allow-Methods:GET,PUT,POST,DELETE');
header('Access-Control-Allow-Headers:Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');

// Response type header
header('Content-Type: application/json');
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
    echo json_encode(DBHandler::AllocateEquipment_UnassignedEquipment());
}
else if($action=="allocate")
{   
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    if($display=DBHandler::AllocateEquipment_Allocation($json->condition,$json->value,$json->equipmentID,$json->userID))
    {
        $response=$display;
    }
    else
    {
        $response=$display;
    }
    echo $response;
}
//else if ($action=='userequipment')
//{
//    $incoming = file_get_contents('php://input');
//    $json = json_decode($incoming);
//    echo json_encode(DBHandler::AllocateEquipment_GetUserEquipment($json->equipmentID));
//}
?>