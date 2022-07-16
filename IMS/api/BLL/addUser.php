<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/20
 * Time: 13:59
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];

if ($action == 'insert') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::addUser_Insert($json->firstName, $json->lastName, $json->dob, $json->contactNumber, $json->email, $json->password, $json->userType, $json->address1, $json->address2, $json->suburb));
} elseif ($action == 'city') {
    echo json_encode(DBHandler::AddUser_City());
} elseif ($action == 'suburb') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::AddUser_Suburb($json->city));
} elseif ($action == 'userType') {
    echo json_encode(DBHandler::AddUser_UserType());
}
