create procedure uspReport_ItAdmin_Users(IN cName varchar(45), IN uType varchar(45), IN sName varchar(45))
  BEGIN
    SELECT u.UserID,
           CONCAT(u.FirstName, ' ', u.Surname) AS User,
           u.ContactNumber,
           ut.UserTypeDesc                     AS Type,
           s.suburbName,
           c.cityName
    FROM user AS u,
         usertype AS ut,
         suburb AS s,
         city AS c
    WHERE u.Type = ut.UserTypeID
      AND s.suburbID = u.Suburb
      AND s.cityID = c.cityID
      AND c.cityName LIKE CONCAT(cName, '%')
      AND ut.UserTypeDesc LIKE CONCAT(uType, '%')
      AND s.suburbName LIKE CONCAT(sName, '%');
  END;

