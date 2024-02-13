
CREATE OR ALTER PROCEDURE createProject ( @Project_id VARCHAR(100),@ProjectName VARCHAR(100), @projectDescription VARCHAR(500), @assignedTo VARCHAR(100), @assigneeName VARCHAR(100), @endDate VARCHAR(50))

AS
BEGIN 
INSERT INTO Projects (Project_id ,ProjectName , projectDescription , assignedTo , assigneeName , endDate )
VALUES(@Project_id ,@ProjectName , @projectDescription , @assignedTo , @assigneeName , @endDate)
END

