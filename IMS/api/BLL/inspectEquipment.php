<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/08/28
 * Time: 19:38
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];

if($action == 'equipments')
{
    $userID = json_decode($_GET['userID']);
    echo json_encode(DBHandler::InspectEquipmentByID($userID));
}
else if ($action == 'conditions')
{
    echo json_encode(DBHandler::AddEquipment_Conditions());
}
else if ($action == 'individualInfo')
{
    $serial = json_decode($_GET['serial']);
    echo json_encode(DBHandler::InspectEquipmentBySerial($serial));
}
else if ($action == 'individualInfoImage')
{
    $serial = json_decode($_GET['serial']);
    echo DBHandler::InspectEquipmentBySerial_Image($serial);
}
else if ($action == 'insert')
{
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::InspectEquipment_Insert($json->userID,$json->serial,$json->condition,$json->value,$json->status,$json->description));
}
else if ($action == 'imageUpload')
{
    $serial = json_decode($_POST['serial']);
    // Get Temp Path
    $tempPath = $_FILES['file']['tmp_name'];
    // Get File Name
    $actualName = $_FILES['file']['name'];
    // New path
    $actualPath = '../uploads/'.$actualName;
    // Move File into new path
    move_uploaded_file($tempPath,$actualPath);
    // Get real path of moved file here
    $realPath =  realpath(__DIR__ .'/'.$actualPath);
    // Execute the non query
    echo json_encode(DBHandler::InspectEquipment_InsertImage($actualPath,$serial));
    // Delete the file
    unlink($realPath);
}