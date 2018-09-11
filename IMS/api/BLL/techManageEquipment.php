<?php

require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;


$action = $_GET['action'];
if ($action == 'getInfo') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    echo json_encode(DBHandler::TechManageEquipment_GetAllocatedEquipment($json->id, $json->sDate, $json->eDate));
}