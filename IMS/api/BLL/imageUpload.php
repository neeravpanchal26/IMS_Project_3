<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/07/24
 * Time: 18:14
 */
require_once '../BLL/CORS_Headers.php';
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

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
