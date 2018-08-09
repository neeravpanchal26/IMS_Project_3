<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/26
 * Time: 11:26
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action = $_GET['action'];

if($action == 'oldPassword') {
    $userID = json_decode($_GET['userID']);
    $password = $_GET['password'];
    echo json_encode(DBHandler::UserPassword_OldCheck($userID, $password));
}
else if($action == 'update') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::UserPassword_UpdatePass($json->userID, $json->password));
}