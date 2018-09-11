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

if ($action == 'addCity') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::Secondary_City_Add($json->name));
} elseif ($action == 'addSuburb') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::Secondary_Suburb_Add($json->cityID, $json->suburbName));
} else if ($action == 'addCondition') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::Secondary_Condition_Add($json->name));
} else if ($action == 'addBrand') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::Secondary_Brand_Add($json->name));
} else if ($action == 'addSection') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::Secondary_Section_Add($json->name));
} else if ($action == 'addType') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::Secondary_Type_Add($json->name));
} else if ($action == 'addSupplier') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::Secondary_Supplier_Add($json->name, $json->number, $json->email));
}