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
    public static function Login_Check($username,$password)
    {
        $sp = 'CALL uspLogin_Check (?,?)';
        $param = array(&$username,&$password);
        return DBHelper::SelectParam($sp,$param);
    }
    //Add User components methods
    public static function addUser_Insert ($fN,$lN,$dob,$cN,$eA,$pW,$uT,$a1,$a2,$sub)
    {
        $sp = 'CALL uspAddUser_Create (?,?,?,?,?,?,?,?,?,?)';
        $param = array(&$fN,&$lN,&$dob,&$cN,&$eA,&$pW,&$uT,&$a1,&$a2,&$sub);
        return DBHelper::ExecuteNonQuery($sp,$param);
    }
    public static function AddUser_City ()
    {
        $sp = 'CALL uspAddUser_City';
        return DBHelper::Select($sp);
    }
    public static function AddUser_Suburb ($city)
    {
        $sp = 'CALL uspAddUser_Suburb (?)';
        $param = array(&$city);
        return DBHelper::SelectParam($sp,$param);
    }
    public static function AddUser_UserType ()
    {
        $sp = 'CALL uspAddUser_UserType';
        return DBHelper::Select($sp);
    }
    //Void User Component methods
    public static function VoidUser_ByType($typeID)
    {
        $sp = 'CALL uspVoidUser_ByType(?)';
        $param = array(&$typeID);
        return DBHelper::SelectParam($sp, $param);
    }
    //Add Equipment component methods
    public static function AddEquipment_Status()
    {
        $sp = 'CALL uspAddEquipment_Status';
        return DBHelper::Select($sp);
    }
    public static function AddEquipment_Brand()
    {
        $sp = 'CALL uspAddEquipment_Brands';
        return DBHelper::Select($sp);
    }
}