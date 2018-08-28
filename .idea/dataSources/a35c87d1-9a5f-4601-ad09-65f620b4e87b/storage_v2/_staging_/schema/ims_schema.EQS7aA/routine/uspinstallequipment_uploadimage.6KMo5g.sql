create procedure uspInstallEquipment_UploadImage(IN img longblob, IN serial varchar(24))
BEGIN
  SELECT equipment.equipmentID INTO @id FROM equipment WHERE equipment.Serial = serial;
  UPDATE equipmenthistory SET equipmenthistory.Picture = img WHERE equipmentID = @id;
  UPDATE equipment SET equipment.ConditionPicture = img WHERE equipment.Serial = serial;
END;
