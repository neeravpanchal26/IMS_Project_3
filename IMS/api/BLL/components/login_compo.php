<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/15
 * Time: 13:37
 */
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

use DAL\usp_login_compo;

$userName = $_GET['username'];

$display = usp_login_compo::getSpecificUser($userName);

$result = $display[0];

if( password_verify($input, $result['loginPassword']) )
{
    $post = array($yn = true);
}
else
{
    $post = array($yn = false);
}
echo json_encode($post);
