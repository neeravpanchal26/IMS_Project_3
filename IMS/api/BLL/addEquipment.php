<?php



header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../DAL/DBHandler.php';

use DAL\DBHandler;
$action =   $_GET['action'];

if ($action=='status')
{
    echo json_encode(DBHandler::AddEquipment_Status());
}
else if($action=='brands')
{
    echo json_encode(DBHandler::AddEquipment_Brand());
}
//echo json_encode($post);
?>