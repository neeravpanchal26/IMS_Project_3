<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/16
 * Time: 08:00
 */

namespace DAL;

require_once '../DAL/DBHelper.php';

class DBHandler
{
    //Login components methods
    public static function Login_GetSpecificUser($username)
    {
        $sp = 'CALL uspLogin_GetSpecificUser (?)';
        $param = array(&$username);
        return DBHelper::SelectParam($sp,$param);
    }
    public static function AddEquipment()
    {
        $sp = 'CALL AddEquipment ()';
        $param = array(&$username);
        return DBHelper::SelectParam($sp,$param);
    }
    //Add User components methods
    public static function addUser_Insert ($param)
    {
        $sp = 'CALL uspAddUser_Insert (?,?,?,?,?,?,?,?,?,?)';
        return DBHelper::ExecuteNonQuery($sp,$param);
    }
    public static function AddUser_City ()
    {
        $sp = 'CALL uspAddUser_City';
        return DBHelper::Select($sp);
    }
    public static function AddUser_Suburb ($param)
    {
        $sp = 'CALL uspAddUser_Suburb (?)';
        return DBHelper::SelectParam($sp,$param);
    }
    public static function AddUser_UserType ()
    {
        $sp = 'CALL uspAddUser_UserType';
        return DBHelper::Select($sp);
    }
}