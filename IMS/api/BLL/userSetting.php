<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/25
 * Time: 15:56
 */
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action =   $_GET['action'];

if($action == 'update') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    if ($display = DBHandler::UserSetting_Update($json->userID,$json->firstName,$json->lastName,$json->dob,$json->contactNumber,$json->email,$json->address1,$json->address2,$json->suburb)) {
        $response = $display;
    } else {
        $response = $display;
    }
    echo json_encode($response);
}
elseif($action == 'suburb') {
    echo json_encode(DBHandler::UserSetting_Suburbs());
}
elseif($action == 'specificUser') {
    $userID = json_decode($_GET['userID']);
    echo json_encode(DBHandler::UserSetting_SpecificUser($userID));
}
