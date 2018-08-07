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
    // Login components methods
    public static function Login_Check($username,$password)
    {
        $sp = 'CALL uspLogin_Check (?,?)';
        $param = array(&$username,&$password);
        return DBHelper::SelectParam($sp,$param);
    }

    // Add User components methods
    public static function addUser_Insert ($fN,$lN,$dob,$cN,$eA,$pW,$uT,$a1,$a2,$sub)
    {
        $sp = 'CALL uspAddUser_Create (?,?,?,?,?,?,?,?,?,?)';
        $param = array(&$fN,&$lN,&$dob,&$cN,&$eA,&$pW,&$uT,&$a1,&$a2,&$sub);
        return DBHelper::SelectParam($sp,$param);
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

    // Void User Component methods
    public static function VoidUser_Status($id,$status)
    {
        $sp = 'CALL uspVoidUser_Status (?,?)';
        $param = array(&$id,&$status);
        return DBHelper::ExecuteNonQuery($sp,$param);
    }
    public static function VoidUser_Users($id)
    {
        $sp = 'CALL uspVoidUser_Users (?)';
        $param = array(&$id);
        return DBHelper::SelectParam($sp,$param);
    }
    public static function VoidUser_Type($id,$type)
    {
        $sp = 'CALL uspVoidUser_Type (?,?)';
        $param = array(&$id,&$type);
        return DBHelper::ExecuteNonQuery($sp,$param);
    }

    // ADD Equipment component methods AND equipment details caller for UPDATE page
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
    public static function AddEquipment_Users()
    {
        $sp = 'CALL uspAddEquipment_Users';
        return DBHelper::Select($sp);
    }
    public static function AddEquipment_Types()
    {
        $sp = 'CALL uspAddEquipment_Types';
        return DBHelper::Select($sp);
    }
    public static function AddEquipment_Conditions()
    {
        $sp = 'CALL uspAddEquipment_Condition';
        return DBHelper::Select($sp);
    }
    public static function AddEquipment_Section()
    {
        $sp='CALL uspAddEquipment_Section';
        return DBHelper::Select($sp);
    }public static function AddEquipment_Suppliers()
    {
        $sp='CALL uspAddEquipment_Suppliers';
        return DBHelper::Select($sp);
    }
    public static function AddEquipment_Insert($name, $desc, $cost, $equipCondition, $brand, $section,$type, $dateReceive, $barcode,$supplier)
    {
        $sp='CALL uspAddEquipment_Insert (?, ?, ?, ?, ?,?, ?, ?, ?,?)';
        $param = array(&$name,&$desc,&$cost,&$equipCondition,&$brand,&$section,&$type,&$dateReceive,&$barcode,&$supplier);
        return DBHelper::ExecuteNonQuery($sp,$param);
    }
    //Update Equipment
    public static function UpdateEquipment_GetEquipmentDetailsViaID($id)
    {
        $sp='CALL uspUpdateEquipment_GetEquipmentDetailsViaID (?)';
        $param = array(&$id);
        return DBHelper::SelectParam($sp,$param);
    }
    // Allocate Equipment component methods
    public static function AllocateEquipment_TechEmployees()
    {
        $sp = 'CALL uspAllocateEquipment_TechnicalEmployees';
        return DBHelper::Select($sp);
    }
    public static function AllocateEquipment_Equipments()
    {
        $sp='CALL uspAllocateEquipment_Equipments';
        return DBHelper::Select($sp);
    }
    public static function AllocateEquipment_UnassignedEquipment()
    {
        $sp='CALL uspAllocateEquipment_GetUnnassignedEquipment';
        return DBHelper::Select($sp);
    }
    public static function AllocateEquipment_Allocation($condition,$value,$equipmentID,$userID)
    {
        $sp = "CALL uspAllocateEquipment_Allocation(?,?,?,?)";
        $param = array(&$condition,&$value,&$equipmentID,&$userID);
        return DBHelper::ExecuteNonQuery($sp,$param);
    }
    

    // User Setting component methods
    public static function UserSetting_SpecificUser($userid)
    {
        $sp = 'CALL uspUserSetting_SpecificUser (?)';
        $param = array(&$userid);
        return DBHelper::SelectParam($sp,$param);
    }
    public static function UserSetting_Suburbs()
    {
        $sp = 'CALL uspUserSetting_Suburbs';
        return DBHelper::Select($sp);
    }
    public static function UserSetting_Update($uI,$fN,$lN,$dob,$cN,$eA,$a1,$a2,$sub)
    {
        $sp = 'CALL uspUserSetting_Update (?,?,?,?,?,?,?,?,?)';
        $param = array(&$uI,&$fN,&$lN,&$dob,&$cN,&$eA,&$a1,&$a2,&$sub);
        return DBHelper::ExecuteNonQuery($sp,$param);
    }

    // User Password Reset component methods
    public static function UserPassword_OldCheck ($userID,$password)
    {
        $sp = 'CALL uspUserPassword_OldCheck (?,?)';
        $param = array(&$userID,&$password);
        return DBHelper::SelectParam($sp,$param);
    }
    public static function UserPassword_UpdatePass ($userID,$password)
    {
        $sp = 'CALL uspUserPassword_UpdatePass (?,?)';
        $param = array(&$userID,&$password);
        return DBHelper::ExecuteNonQuery($sp,$param);
    }

    // Dashboard components methods
    public static function Dashboard_Users ($days)
    {
        $sp = 'CALL uspDashboard_Users (?)';
        $param = array(&$days);
        return DBHelper::SelectParam($sp,$param);
    }
    public static function Dashboard_IndividualUser($userID,$days)
    {
        $sp = 'CALL uspDashboard_IndividualUser (?,?)';
        $param = array(&$userID,&$days);
        return DBHelper::SelectParam($sp,$param);
    }

    // Business Footer components methods
    public static function Business()
    {
        $sp = 'CALL uspBusiness';
        return DBHelper::Select($sp);
    }

    // Business Setting components methods
    public static function Business_Logo()
    {
        $sp = 'CALL uspBusiness_Logo';
        return DBHelper::BlobRetrieve($sp);
    }
    public static function Business_Update($name,$contact,$email)
    {
        $sp = 'CALL uspBusiness_Update(?,?,?)';
        $param = array(&$name,&$contact,&$email);
        return DBHelper::ExecuteNonQuery($sp,$param);
    }
    public static function Business_Logo_Upload($image)
    {
        $sp = 'CALL uspBusiness_Logo_Upload(?)';
        return DBHelper::BlobUpload($sp,$image);
    }

    //Manage Equipment methods
    public static function GetEquipmentInfo()
    {
        $sp = 'CALL uspManageEquipment_GetEquipmentInfo';
        return DBHelper::Select($sp);
    }
}