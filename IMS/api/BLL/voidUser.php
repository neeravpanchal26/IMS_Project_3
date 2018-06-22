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

if($action == 'insert') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    if ($display = DBHandler::addUser_Insert($json->firstName,$json->lastName,$json->dob,$json->contactNumber,$json->email,$json->password,$json->userType,$json->address1,$json->address2,$json->suburb)) {
        $response = $display;
    } else {
        $response = $display;
    }
    echo json_encode($response);
}
elseif($action == 'userByType') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    echo json_encode(DBHandler::VoidUser_ByType(1));
}
elseif($action == 'userType') {
    echo json_encode(DBHandler::AddUser_UserType());
}