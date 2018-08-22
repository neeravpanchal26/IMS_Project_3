<?php
require_once '../BLL/CORS_Headers.php';

require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$action = $_GET['action'];

if($action == 'brand')
{
    echo json_encode(DBHandler::AddEquipment_Brand());
}
else if($action == 'status')
{
    echo json_encode(DBHandler::AddEquipment_Status());
}
else if($action=='users')
{
    echo json_encode(DBHandler::AddEquipment_Users());
}
else if ($action=='types')
{
    echo json_encode(DBHandler::AddEquipment_Types());
}
else if ($action=='condition')
{
    echo json_encode(DBHandler::AddEquipment_Conditions());
}
else if ($action=='section')
{
    echo json_encode(DBHandler::AddEquipment_Section());
}
else if($action=='suppliers')
{
    echo json_encode(DBHandler::AddEquipment_Suppliers());
}
else if ($action == 'insert') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode (DBHandler::AddEquipment_Insert($json->name, $json->desc, $json->cost, $json->equipmentCondition, $json->brand, $json->section, $json->type, $json->dateReceived, $json->barcode, $json->supplier));
}
else if($action=='imageUpload')
{
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
    echo json_encode(DBHandler::AddEquipment_UploadImage($actualPath));
    // Delete the file
    unlink($realPath);
}