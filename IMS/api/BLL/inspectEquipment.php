<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/08/28
 * Time: 19:38
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];

if($action == 'equipments')
{
    $userID = json_decode($_GET['userID']);
    echo json_encode(DBHandler::InspectEquipmentByID($userID));
}
else if ($action == 'conditions')
{
    echo json_encode(DBHandler::AddEquipment_Conditions());
}