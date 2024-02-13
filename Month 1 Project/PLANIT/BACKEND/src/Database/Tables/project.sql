USE Planit

CREATE TABLE Projects (Project_id VARCHAR(100),ProjectName VARCHAR(100), projectDescription VARCHAR(500), assignedTo VARCHAR(100), assigneeName VARCHAR(100), endDate VARCHAR(50), isCompleted bit not null default 0)

SELECT * FROM Projects