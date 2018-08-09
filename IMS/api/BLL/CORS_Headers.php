<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/08/09
 * Time: 19:22
 */
// Default Header
header('Access-Control-Allow-Methods:GET,PUT,POST,DELETE');
header('Access-Control-Allow-Headers:Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');

// Response type header
header('Content-Type: application/json');