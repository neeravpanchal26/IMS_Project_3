<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/09/04
 * Time: 17:58
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];

if($action == 'ItAdminUsers')
{
    $cityID = ''.json_decode($_GET['cityID']).'';
    $typeID = ''.json_decode($_GET['typeID']).'';
    $suburbID = ''.json_decode( $_GET['suburbID']).'';
    echo json_encode(DBHandler::Report_ItAdmin_Users($cityID,$typeID,$suburbID));
}