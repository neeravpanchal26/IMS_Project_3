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

if ($action == 'ItAdminUsers') {
    $cName = $_GET['cName'];
    $uType = $_GET['uType'];
    $sName = $_GET['sName'];
    echo json_encode(DBHandler::Report_ItAdmin_Users($cName, $uType, $sName));
} elseif ($action == 'techEmployee') {
    $sDate = $_GET['sDate'];
    $eDate = $_GET['eDate'];
    $aType = $_GET['aType'];
    $eCondition = $_GET['eCondition'];
    $userID = $_GET['userID'];
    echo json_encode(DBHandler::Report_TechnicalEmployee_History($sDate,$eDate,$aType,$eCondition,$userID));
}