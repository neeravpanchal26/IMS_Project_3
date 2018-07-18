<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/07/07
 * Time: 13:12
 */
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action =   $_GET['action'];

if($action == 'users') {
    echo json_encode(DBHandler::Dashboard_Users());
}
else if($action == 'specificUser') {
    $userID = json_decode($_GET['userID']);
    echo json_encode(DBHandler::Dashboard_IndividualUser($userID));
}
