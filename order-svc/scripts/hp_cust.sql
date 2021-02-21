CREATE TABLE HP_CUST
(
    ID uuid NOT NULL,
    CUST_NAME 	text COLLATE pg_catalog.default,
    STATUS	text COLLATE pg_catalog.default,
    IS_DELETED boolean,
    CREATED_BY text COLLATE pg_catalog.default,
    CREATED_DT timestamp with time zone,
    MODIFIED_BY text COLLATE pg_catalog.default,
    MODIFIED_DT timestamp with time zone,
    CONSTRAINT HP_CUST_pkey PRIMARY KEY (ID)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


INSERT INTO HP_CUST(
	ID, CUST_NAME, STATUS,
	IS_DELETED, CREATED_BY, CREATED_DT, MODIFIED_BY, MODIFIED_DT)
	VALUES (uuid_generate_v4(),
			'MICHELLE LIM', 
			'ACTIVE',
			false, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP);