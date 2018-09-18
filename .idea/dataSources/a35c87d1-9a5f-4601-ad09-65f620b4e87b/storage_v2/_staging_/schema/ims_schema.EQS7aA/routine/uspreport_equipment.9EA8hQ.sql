create procedure uspReport_Equipment(IN uID VARCHAR(45))
  BEGIN
    SELECT CONCAT(e.Name, ' - (', e.EquipmentID, ')') AS equipment
    FROM equipment AS e,
         equipmenthistory AS eh,
         user AS u,
         usertype AS ut
    WHERE e.EquipmentID = eh.equipmentID
      AND eh.userID = u.UserID
      AND u.Type = ut.UserTypeID
      AND CONCAT(u.Firstname, ' ', u.Surname, ' - (', ut.UserTypeDesc, ')') LIKE CONCAT(uID, '%');
  END;

