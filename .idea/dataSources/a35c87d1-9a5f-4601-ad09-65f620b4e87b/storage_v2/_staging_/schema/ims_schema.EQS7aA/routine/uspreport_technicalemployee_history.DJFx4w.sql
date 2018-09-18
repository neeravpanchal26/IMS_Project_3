create procedure uspReport_TechnicalEmployee_History(IN sDate      varchar(10), IN eDate varchar(10),
                                                     IN aType      varchar(45), IN eCondition varchar(45),
                                                     IN uID        varchar(45), IN ehStatus varchar(45),IN equip varchar(100))
  BEGIN
    SELECT e.EquipmentID, e.Name, eh.`Desc`, eh.Value,eh.Date, c.ConditionDesc, a.TypeDesc,ehs.StatusDesc AS Active,eh.userID
    FROM equipment AS e,
         equipmenthistory AS eh,
         `condition` AS c,
         allocationtype AS a,
         user AS u,
         userType AS ut,
         equipmenthistorystatus AS ehs
    WHERE e.EquipmentID = eh.equipmentID
      AND eh.`Condition` = c.ConditionID
      AND eh.AllocationType = a.TypeID
      AND eh.userID = u.UserID
      AND u.`Type` = ut.UserTypeID
      AND eh.Active = ehs.StatusID
      AND CONCAT(e.Name,' - (',e.EquipmentID,')') LIKE CONCAT(equip,'%')
      AND CONCAT(u.Firstname,' ',u.Surname,' - (',ut.UserTypeDesc,')') LIKE CONCAT(uID,'%')
      AND a.TypeDesc LIKE CONCAT( aType,'%')
      AND c.ConditionDesc LIKE CONCAT( eCondition,'%')
      AND eh.`Date` BETWEEN sDate AND eDate
      AND ehs.StatusDesc LIKE CONCAT(ehStatus,'%')
    ORDER BY e.EquipmentID ASC;
END;

