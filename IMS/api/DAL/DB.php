<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/16
 * Time: 07:48
 */

namespace DAL;


class DB
{
    private static $dbHost = '127.0.0.1';
    private static $dbUser = 'root';
    private static $dbPass = '';
    private static $dbName = 'ims_schema';

    protected static function Connect()
    {
        return mysqli_connect(self::$dbHost, self::$dbUser, self::$dbPass, self::$dbName);
    }
}