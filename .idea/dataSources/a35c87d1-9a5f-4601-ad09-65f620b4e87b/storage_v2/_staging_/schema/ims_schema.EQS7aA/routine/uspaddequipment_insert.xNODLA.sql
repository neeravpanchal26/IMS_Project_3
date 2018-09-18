create procedure uspAddEquipment_Insert(IN eName              varchar(45), IN description varchar(45), IN cost int,
                                        IN equipmentCondition int, IN brand int, IN section int, IN eType int,
                                        IN dateReceived       date, IN barcode varchar(50), IN supplier int)
  BEGIN
    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
      GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
      SELECT errno AS MYSQL_ERROR;
      ROLLBACK;
    END;

    START TRANSACTION;
    SET autocommit = 0;
    SET @equipmentID = (SELECT MAX(equipment.EquipmentID) + 1 FROM equipment);

    IF ((SELECT COUNT(e.`Serial`) FROM equipment AS e WHERE e.`Serial` = barcode) >= 1)
    THEN
      SELECT true AS barcodeError;
    ElSE
      INSERT INTO `ims_schema`.`equipment` (`EquipmentID`,
                                            `Name`,
                                            `Desc`,
                                            `Cost`,
                                            `EquipmentCondition`,
                                            `Brand`,
                                            `Section`,
                                            `Type`,
                                            `Status`,
                                            `DateReceived`,
                                            `Supplier`,
                                            `Serial`)
      VALUES (@equipmentID,
              eName,
              description,
              cost,
              equipmentCondition,
              brand,
              section,
              eType,
              2,
              CONCAT(dateReceived, ' ', CURRENT_TIME()),
              supplier,
              barcode);
    END IF;

    IF (row_count() > 0)
    THEN
      SELECT TRUE;
    END IF;

    COMMIT WORK;
  END;

