<?php
require_once '../BLL/CORS_Headers.php';

require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];

if($action=='install')
{
    $userID = json_decode($_GET['userID']);
    echo json_encode(DBHandler::InstallEquipment_InstallEquipmentViaUserID($userID));
}
if($action=='installEquipment')
{
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::InstallEquipment_Installation($json->serial,$json->coords, $json->userID, $json->act, $json->desc));
}
else if($action=='imageUpload')
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
    echo json_encode(DBHandler::InstallEquipment_UploadImage($actualPath,$serial));
    // Delete the file
    unlink($realPath);
}

?>