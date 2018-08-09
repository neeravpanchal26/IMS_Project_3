<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/16
 * Time: 07:50
 */

namespace DAL;

require_once '../DAL/DB.php';

class DBHelper extends DB
{
    public static function Select($query)
    {
        //Open Connection
        $conn = DB::Connect();
        //Build Query
        $call = mysqli_query($conn, $query);
        //Fetch All Row
        $row = mysqli_fetch_all($call, MYSQLI_ASSOC);
        //Close Connection
        mysqli_close($conn);
        //Return Result
        return $row;
    }
    public static function SelectParam($query, array $param)
    {
        //Variables
        $arrayType = null;
        //Format Calculation Loop
        foreach ($param as $element) {
            if (is_string($element)) {
                $arrayType .= 's';
            } else if (is_int($element)) {
                $arrayType .= 'i';
            } else if (is_double($element)) {
                $arrayType .= 'd';
            }
        }
        //Open Connection
        $conn = DB::Connect();
        //Prepare Query
        $call = mysqli_prepare($conn, $query);
        //Bind Query
        call_user_func_array(array($call, 'bind_param'), array_merge(array($arrayType), $param));
        //Execute Query
        mysqli_stmt_execute($call);
        //Fetch Result
        $result = mysqli_stmt_get_result($call);
        //Fill Row
        $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
        //Close Connection
        mysqli_close($conn);
        //Return Result
        return $row;
    }
    public static function ExecuteNonQuery($query, array $param)
    {
        //Variables
        $arrayType = null;
        //Format Calculation Loop
        foreach ($param as $element) {
            if (is_string($element)) {
                $arrayType .= 's';
            }
            else if (is_int($element)) {
                $arrayType .= 'i';
            }
            else if (is_double($element)) {
                $arrayType .= 'd';
            }
        }
        //Open Connection
        $conn = DB::Connect();
        //Prepare Query
        $call = mysqli_prepare($conn, $query);
        //Bind Query
        call_user_func_array(array($call, 'bind_param'), array_merge(array($arrayType), $param));
        //Execute Query
        $result = mysqli_stmt_execute($call);
        //Close Connection
        mysqli_close($conn);
        //Return Result
        return $result;
    }
    public static function BlobRetrieve($query)
    {
        //Open Connection
        $conn = DB::Connect();
        $call = $conn->query($query);
        //Get result
        $result = $call->fetch_assoc();
        //Close Connection
        mysqli_close($conn);
        return $result;
    }
    public static function BlobUpload($query,$image)
    {
        //Open Connection
        $conn = DB::Connect();
        //Prepare Query
        $call = $conn->prepare($query);
        $null = null;
        $call->bind_param('b', $null);
        $call->send_long_data(0, file_get_contents($image));
        $call->execute();
        //Close Connection
        mysqli_close($conn);
        //Return Result
        return $call;
    }
}