<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/15
 * Time: 12:47
 */
namespace DAL;
use mysqli_sql_exception;


class DBHandler
{
    //Global Declaration
    private static $conn;
    //Open database connection
    public static function DBOpen()
    {
        //Configuration File Include
        include_once('../DAL/DBConfig.php');

        if(!isset(self::$conn))
        {
            try
            {
                self::$conn = mysqli_connect(DB_DSN,DB_USERNAME,DB_PASSWORD,DB_NAME);
            }
            catch (mysqli_sql_exception $exception)
            {
                mysqli_close(self::$conn);
                $eMessage = $exception->getMessage();
                echo json_encode($eMessage);
                exit();
            }
        }
        //Return Connection
        return self::$conn;
    }
    //Close database connection
    public static function DBClose()
    {
        return mysqli_close(self::$conn);
    }
    //Select
    public static function Select ($query)
    {
        try
        {
            //Open Connection
            $dbConn = self::DBOpen();
            //Build Query
            $call = mysqli_query($dbConn,$query);
            //Fetch All
            $row = mysqli_fetch_all($call,MYSQLI_ASSOC);
        }
        catch(mysqli_sql_exception $exception)
        {
            self::DBClose();
            $eMessage = $exception->getMessage();
            echo json_encode($eMessage);
            exit();
        }
        return $row;
    }
    //Select with parameters
    public static function SelectParam ($query,array $param)
    {
        //Assign variable
        $arrayType = null;
        //Format Calculation Loop
        foreach ($param as $element)
        {
            if (is_string($element))
            {
                $arrayType .= 's';
            } else if (is_int($element))
            {
                $arrayType .= 'i';
            } else if (is_double($element))
            {
                $arrayType .= 'd';
            }
        }
        try
        {
            //Open Connection
            $dbConn = self::DBOpen();
            //Build Query
            $call = mysqli_query($dbConn,$query);
            //Bind Param
            call_user_func_array(array($call, 'bind_param'), array_merge(array($arrayType), $param));
            //Execute Query
            mysqli_stmt_execute($call);
            //Fetch Result
            $result = mysqli_stmt_get_result($call);
            //Fill Rows
            $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
        }
        catch(mysqli_sql_exception $exception)
        {
            self::DBClose();
            $eMessage = $exception->getMessage();
            echo json_encode($eMessage);
            exit();
        }
        return $row;
    }
    //Insert, Update & Delete
    public static function ExecuteNonQuery ($query,array $param)
    {
        //Assign variable
        $arrayType = null;
        //Format Calculation Loop
        foreach ($param as $element)
        {
            if (is_string($element))
            {
                $arrayType .= 's';
            } else if (is_int($element))
            {
                $arrayType .= 'i';
            } else if (is_double($element))
            {
                $arrayType .= 'd';
            }
        }
        try
        {
            //Open Connection
            $dbConn = self::DBOpen();
            //Prepare Query
            $call = mysqli_prepare($dbConn,$query);
            //Bind Param
            call_user_func_array(array($call, 'bind_param'), array_merge(array($arrayType), $param));
            //Execute Query
            $row = mysqli_stmt_execute($call);
        }
        catch(mysqli_sql_exception $exception)
        {
            self::DBClose();
            $eMessage = $exception->getMessage();
            echo json_encode($eMessage);
            exit();
        }
        return $row;
    }
}