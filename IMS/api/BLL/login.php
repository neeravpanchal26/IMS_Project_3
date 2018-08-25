<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/16
 * Time: 08:07
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$incoming = file_get_contents('php://input');
$json = json_decode($incoming);
echo json_encode(DBHandler::Login_Check($json->username, $json->password));