<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/07/22
 * Time: 17:06
 */
// Default Header
header('Access-Control-Allow-Methods:GET,PUT,POST,DELETE');
header('Access-Control-Allow-Headers:Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');

// Response type header
header('Content-Type: application/json');

require_once '../DAL/DBHandler.php';
use DAL\DBHandler;

$result = DBHandler::Business_Logo();
echo $result['Logo'];

//$db = mysqli_connect("127.0.0.1","BIT1","password1","ims_schema"); //keep your db name
//$query = "SELECT business.Logo FROM business WHERE business.BusinessID = 1";
//$sth = $db->query($query);
//$fetch=$sth->fetch_assoc();
//echo $fetch['Logo'];
//echo '<img src="data:image/jpeg;base64,'.base64_encode( $fetch['Logo'] ).'"/>';