<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/07/24
 * Time: 18:14
 */
header('Access-Control-Allow-Origin: *');
header("Content-type: image/png");
$incoming = file_get_contents('php://input');
echo $incoming['image'];
$image = addslashes(file_get_contents($_FILES['image']['tmp_name']));