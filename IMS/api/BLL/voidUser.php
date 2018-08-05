<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/21
 * Time: 18:00
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

if ($action == 'update') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    if ($display = DBHandler::VoidUser_Status($json->UserID,$json->Status)) {
        $response = $display;
    } else {
        $response = $display;
    }
    echo json_encode($response);
}
else if ($action == 'type') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    if ($display = DBHandler::VoidUser_Type($json->UserID,$json->Status)) {
        $response = $display;
    } else {
        $response = $display;
    }
    echo json_encode($response);
}
else if ($action == 'users') {
    $userID = json_decode($_GET['userID']);
    echo json_encode(DBHandler::VoidUser_Users($userID));
}