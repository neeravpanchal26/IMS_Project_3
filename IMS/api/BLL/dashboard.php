<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/07/07
 * Time: 13:12
 */
// Default Header
header('Access-Control-Allow-Methods:GET,PUT,POST,DELETE');
header('Access-Control-Allow-Headers:Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');

// Response type header
header('Content-Type: application/json');

require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action =   $_GET['action'];

if($action == 'users') {
    $days = json_decode($_GET['days']);
    echo json_encode(DBHandler::Dashboard_Users($days));
}
else if($action == 'specificUser') {
    $userID = json_decode($_GET['userID']);
    $days = json_decode($_GET['days']);
    echo json_encode(DBHandler::Dashboard_IndividualUser($userID,$days));
}
