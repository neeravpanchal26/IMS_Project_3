<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;


$action = $_GET['action'];

if($action=='info')
{
    echo json_encode(DBHandler::GetEquipmentInfo());
}

?>