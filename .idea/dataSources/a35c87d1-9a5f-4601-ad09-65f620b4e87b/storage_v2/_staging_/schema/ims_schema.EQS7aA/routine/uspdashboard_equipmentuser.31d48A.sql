create procedure uspDashboard_EquipmentUser(IN userID int, IN days int)
  BEGIN
    SELECT COUNT(equipmenthistory.equipmentID) as count, DATE(equipmenthistory.Date) AS `Date`
    FROM equipmenthistory
    WHERE equipmenthistory.Date between NOW() + INTERVAL - days DAY AND NOW() + INTERVAL  0 DAY
      AND equipmenthistory.userID = userID
    GROUP BY DATE(equipmenthistory.Date);
  END;


