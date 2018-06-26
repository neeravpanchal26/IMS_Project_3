<?php
header('Access-Control-Allow-Origin: *');
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
?>