<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/25
 * Time: 15:56
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];

if($action == 'update') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::UserSetting_Update($json->userID, $json->firstName, $json->lastName, $json->dob, $json->contactNumber, $json->email, $json->address1, $json->address2, $json->suburb));
}
elseif($action == 'suburb') {
    echo json_encode(DBHandler::UserSetting_Suburbs());
}
elseif($action == 'specificUser') {
    $userID = json_decode($_GET['userID']);
    echo json_encode(DBHandler::UserSetting_SpecificUser($userID));
}
