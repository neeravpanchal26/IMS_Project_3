<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/07/24
 * Time: 18:14
 */
header('Access-Control-Allow-Origin: *');
require_once '../DAL/DBHandler.php';
use \DAL\DBHandler;

$tempPath = $_FILES['file']['tmp_name'];

$actualName = $_FILES['file']['name'];

$actualPath = '../uploads/'.$actualName;

move_uploaded_file($tempPath,$actualPath);

$realpath =  realpath(__DIR__ .'/'.$actualPath);

if(DBHandler::Business_Logo_Upload(file_get_contents($realpath)) == 1)
{
    unlink($realpath);
    echo json_encode( 'success!');
} else
{
    unlink($realpath);
    echo json_encode( 'failure!');
}