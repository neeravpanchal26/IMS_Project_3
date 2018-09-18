CREATE PROCEDURE uspManageEquipment_GetEquipmentInfo()
  BEGIN
    SELECT DISTINCT e.EquipmentID,
                    e.Name,
                    e.`Desc`,
                    c.ConditionDesc,
                    s.SectionDesc,
                    e.Active,
                    e.Serial,
                    es.StatusDesc AS StatusDescription,
                    e.DateReceived
    FROM equipment AS e,
         `condition` AS c,
         section AS s,
         equipmentstatus AS es
    WHERE e.EquipmentCondition = c.ConditionID
      AND e.Status = es.StatusID
      AND e.Section = s.SectionID
    ORDER BY e.DateReceived DESC;
  END;
