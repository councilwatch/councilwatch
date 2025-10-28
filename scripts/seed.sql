INSERT INTO users
	("id", "email", "role")
	VALUES (uuidv7(), 'admin__not_an_email', 'admin');
INSERT INTO users
	("id", "email", "role")
	VALUES (uuidv7(), 'moderator__not_an_email', 'moderator');
INSERT INTO users
	("id", "email", "role")
	VALUES (uuidv7(), 'user__not_an_email', 'user');

INSERT INTO events
	("title", "description", "date", "location", "zip_code", "council_id", "approved")
	VALUES ('Example Unapproved Event', 'Example description', CURRENT_DATE, 'Example location', 00000, uuidv7(), 'no');

INSERT INTO events
	("title", "description", "date", "location", "zip_code", "council_id", "approved")
	VALUES ('Example Approved Event', 'Example description', CURRENT_DATE, 'Example location', 00000, uuidv7(), 'yes');
