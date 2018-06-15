<?php
/**
 * Created by PhpStorm.
 * User: nsp
 * Date: 2018/06/15
 * Time: 13:48
 */

namespace DAL;


class usp_login_compo
{
    public static function getSpecificUser($userID)
    {
        $query = 'CALL uspSpecificUser (?)';
        $param = array(&$userID);
        return DBHandler::SelectParam($query,$param);
    }
}