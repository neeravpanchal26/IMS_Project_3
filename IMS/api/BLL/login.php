<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/16
 * Time: 08:07
 */
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$incoming = file_get_contents('php://input');
$json = json_decode($incoming);
if ($display = DBHandler::Login_Check($json->username,$json->password)) {
    $response = $display;
} else {
    $response = false;
}
echo json_encode($response);