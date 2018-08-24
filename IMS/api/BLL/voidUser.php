<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/21
 * Time: 18:00
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action =   $_GET['action'];

if ($action == 'update') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode (DBHandler::VoidUser_Status($json->UserID, $json->Status));
}
else if ($action == 'type') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode (DBHandler::VoidUser_Type($json->UserID, $json->Status));
}
else if ($action == 'users') {
    $userID = json_decode($_GET['userID']);
    echo json_encode (DBHandler::VoidUser_Users($userID));
}