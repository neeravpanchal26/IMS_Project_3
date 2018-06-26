<?php



header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

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
?>