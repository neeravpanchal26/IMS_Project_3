<?php
// Default Header
header('Access-Control-Allow-Methods:GET,PUT,POST,DELETE');
header('Access-Control-Allow-Headers:Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');

// Response type header
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
else if($action=='getEquipmentDetails')
{
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    if($display = DBHandler::UpdateEquipment_GetEquipmentDetailsViaID($json->id))
    {
        $response=$display;
    }
    else
    {
        $response=$display;
    }
    echo json_encode($response);
}
?>