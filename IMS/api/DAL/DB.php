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
    // Local setup
    private static $dbHost = 'b2hlifxdtufssspj9gxp-mysql.services.clever-cloud.com';
    private static $dbUser = 'uch9vb1axp33tdtl';
    private static $dbPass = 'nEBuudx1LuxxvvjAC3pV';
    private static $dbName = 'b2hlifxdtufssspj9gxp';

    // Nmu setup
//   private static $dbHost = 'sict-mysql.nmmu.ac.za';
//   private static $dbUser = 'BIT1';
//   private static $dbPass = 'password1';
//   private static $dbName = 'ims_schema';

    // Droplet setup
//   private static $dbHost = '178.128.251.178';
//   private static $dbUser = 'BIT1';
//   private static $dbPass = 'password1';
//   private static $dbName = 'ims_schema';

    protected static function Connect()
    {
        return mysqli_connect(self::$dbHost, self::$dbUser, self::$dbPass, self::$dbName);
    }
}