<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/28
 * Time: 08:07
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';

use DAL\DBHandler;

$action = $_GET['action'];

if($action == 'info') {
    echo json_encode(DBHandler::Business());
}
else if ($action == 'update') {
    $json = json_decode(file_get_contents('php://input'));
    echo json_encode(DBHandler::Business_Update($json->name,$json->contact,$json->email));
}
else if ($action == 'logoUpload') {
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
    echo json_encode(DBHandler::Business_Logo_Upload($actualPath));
    // Delete the file
    unlink($realPath);
}
else if ($action == 'logoDownload') {
    echo DBHandler::Business_Logo();
}
else if ($action == 'pdfUpload') {
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
    echo json_encode(DBHandler::Business_GroupPolicy_Upload($actualPath));
    // Delete the file
    unlink($realPath);
}