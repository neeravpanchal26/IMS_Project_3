<?php
require_once '../BLL/CORS_Headers.php';

require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action = $_GET['action'];

if($action=='coords')
{
    echo json_encode(DBHandler::InstallEquipment_Coordinates());
}

?>