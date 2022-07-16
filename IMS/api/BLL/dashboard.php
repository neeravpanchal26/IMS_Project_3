<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/07/07
 * Time: 13:12
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];

if ($action == 'users') {
    $days = json_decode($_GET['days']);
    echo json_encode(DBHandler::Dashboard_Users($days));
} else if ($action == 'specificUser') {
    $userID = json_decode($_GET['userID']);
    $days = json_decode($_GET['days']);
    echo json_encode(DBHandler::Dashboard_IndividualUser($userID, $days));
} else if ($action == 'equipment') {
    $days = json_decode($_GET['days']);
    echo json_encode(DBHandler::Dashboard_Equipment($days));
} else if ($action == 'equipmentExtras') {
    $days = json_decode($_GET['days']);
    echo json_encode(DBHandler::Dashboard_EquipmentExtras($days));
} else if ($action == 'equipmentUser') {
    $userID = json_decode($_GET['userID']);
    $days = json_decode($_GET['days']);
    echo json_encode(DBHandler::Dashboard_EquipmentUser($userID, $days));
} else if ($action == 'equipmentHistoryUser') {
    $userID = json_decode($_GET['userID']);
    $days = json_decode($_GET['days']);
    echo json_encode(DBHandler::Dashboard_EquipmentHistoryUser($userID, $days));
}
