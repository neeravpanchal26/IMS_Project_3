<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/28
 * Time: 08:07
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action = $_GET['action'];

if($action == 'info') {
    echo json_encode(DBHandler::Business());
}
else if ($action == 'update') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::Business_Update($json->name,$json->contact,$json->email));
}