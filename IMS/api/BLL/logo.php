<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/07/22
 * Time: 17:06
 */
header('Access-Control-Allow-Origin: *');
header("Content-type: image/png");
require_once '../DAL/DBHandler.php';
use DAL\DBHandler;
$result = DBHandler::Business_Logo();
echo $result['Logo'];

//$db = mysqli_connect("127.0.0.1","BIT1","password1","ims_schema"); //keep your db name
//$query = "SELECT business.Logo FROM business WHERE business.BusinessID = 1";
//$sth = $db->query($query);
//$fetch=$sth->fetch_assoc();
//echo $fetch['Logo'];
echo '<img src="data:image/jpeg;base64,'.base64_encode( $fetch['Logo'] ).'"/>';