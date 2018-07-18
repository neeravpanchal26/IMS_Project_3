<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/21
 * Time: 18:00
 */
header('Access-Control-Allow-Origin: *');
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
else if ($action == 'users') {
    echo json_encode(DBHandler::VoidUser_Users());
}