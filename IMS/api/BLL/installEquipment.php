<?php
require_once '../BLL/CORS_Headers.php';

require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action = $_GET['action'];

if($action=='install')
{
    $userID = json_decode($_GET['userID']);
    echo json_encode(DBHandler::InstallEquipment_InstallEquipmentViaUserID($userID));
}

?>