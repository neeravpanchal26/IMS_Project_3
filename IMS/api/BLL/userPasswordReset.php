<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/26
 * Time: 11:26
 */
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action =   $_GET['action'];

if($action == 'oldPassword') {
    $userID = json_decode($_GET['userID']);
    $password = json_decode($_GET['password']);
    echo json_encode(DBHandler::UserPassword_OldCheck($userID,$password));
}
else if($action == 'update') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    if ($display = DBHandler::UserPassword_UpdatePass($json->userID,$json->password)) {
        $response = $display;
    } else {
        $response = $display;
    }
    echo json_encode($response);
}