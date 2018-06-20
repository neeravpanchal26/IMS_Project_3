<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/20
 * Time: 13:59
 */
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action =   $_GET['action'];

if($action == 'insert') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    $password = password_hash($json->password,PASSWORD_BCRYPT);
    $param = array
    (
        &$json->firstName,
        &$json->lastName,
        &$json->dob,
        &$json->contactNumber,
        &$json->email,
        &$password,
        &$json->userType,
        &$json->address1,
        &$json->address2,
        &$json->suburb
    );

    class Result
    {
    }

    if ($display = DBHandler::addUser_Insert($param)) {
        $response = new Result();
        $response->result = true;
    } else {
        $response = new Result();
        $response->result = false;
    }
    echo json_encode($response.$param);
}
elseif($action == 'city') {
    echo json_encode(DBHandler::AddUser_City());
}
elseif($action == 'suburb') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);

    $param = array
    (
        &$json->city
    );
    echo json_encode(DBHandler::AddUser_Suburb($param));
}
elseif($action == 'userType') {
    echo json_encode(DBHandler::AddUser_UserType());
}
