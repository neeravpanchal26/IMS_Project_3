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
if($action=='installEquipment')
{
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::InstallEquipment_Installation($json->serial,$json->coords, $json->userID, $json->act, $json->desc));
}

?>