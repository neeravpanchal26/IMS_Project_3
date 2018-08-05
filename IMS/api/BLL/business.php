<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/28
 * Time: 08:07
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

if($action == 'info') {
    echo json_encode(DBHandler::Business());
}
else if ($action == 'update') {
    $incoming = file_get_contents('php://input');
    $json = json_decode($incoming);
    echo json_encode(DBHandler::Business_Update($json->name,$json->contact,$json->email));
}