CREATE TABLE HP_ORDER_PRODUCT
(
    ORDER_ID uuid NOT NULL,
    PROD_ID uuid NOT NULL,
    QUANTITY INT,
    IS_DELETED boolean,
    CREATED_BY text COLLATE pg_catalog.default,
    CREATED_DT timestamp with time zone,
    MODIFIED_BY text COLLATE pg_catalog.default,
    MODIFIED_DT timestamp with time zone,
    CONSTRAINT HP_ORDER_PRODUCT_pkey PRIMARY KEY (ORDER_ID, PROD_ID)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


INSERT INTO HP_ORDER_PRODUCT(
	ORDER_ID, PROD_ID, QUANTITY, 
	IS_DELETED, CREATED_BY, CREATED_DT, MODIFIED_BY, MODIFIED_DT)
	VALUES (uuid_generate_v4(),
			'1a86b507-58e3-472d-b0cc-37d67a1f0bee', 
			'c1c99307-1cca-4d2e-8cfa-ccc592f75b15',
            10
			false, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP);
