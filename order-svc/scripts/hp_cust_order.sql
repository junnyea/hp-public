CREATE TABLE HP_CUST_ORDER
(
    ID uuid NOT NULL,
    CUST_ID uuid NOT NULL,
    STATUS	text COLLATE pg_catalog.default,
    TOTAL_AMOUNT NUMERIC(10,2),
    IS_DELETED boolean,
    CREATED_BY text COLLATE pg_catalog.default,
    CREATED_DT timestamp with time zone,
    MODIFIED_BY text COLLATE pg_catalog.default,
    MODIFIED_DT timestamp with time zone,
    CONSTRAINT HP_CUST_ORDER_pkey PRIMARY KEY (ID)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


INSERT INTO HP_CUST_ORDER(
	ID, CUST_ID, STATUS, TOTAL_AMOUNT,
	IS_DELETED, CREATED_BY, CREATED_DT, MODIFIED_BY, MODIFIED_DT)
	VALUES (uuid_generate_v4(),
			'1a86b507-58e3-472d-b0cc-37d67a1f0bee', 
			'ACCEPTED',
            '100.00'
			false, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP);




