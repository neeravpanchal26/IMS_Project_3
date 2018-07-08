<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/28
 * Time: 08:07
 */
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

echo json_encode(DBHandler::Business());