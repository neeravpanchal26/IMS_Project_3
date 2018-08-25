<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/08/25
 * Time: 15:48
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];

if($action == 'addCity')
{
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::SecondaryCity_Add($json->name));
}
elseif ($action =='addSuburb')
{
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::Secondary_Suburb_Add($json->cityID,$json->suburbName));
}