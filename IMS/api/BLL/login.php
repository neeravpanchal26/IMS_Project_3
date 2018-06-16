<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/16
 * Time: 08:07
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$input =   $_GET['password'];

$userName = $_GET['username'];

$display = DBHandler::Login_GetSpecificUser($userName);

$result = $display[0];

if(password_verify($input, $result['userPassword']))
{
    $post = array($yn = true);
}
else
{
    $post = array($yn = false);
}
echo json_encode($post);