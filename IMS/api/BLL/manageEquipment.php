<?php
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;


$action = $_GET['action'];

if($action=='info')
{
    echo json_encode(DBHandler::GetEquipmentInfo());
}
else if($action='active')
{
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::ManageEquipment_Active($json->id,$json->active));
}
?>