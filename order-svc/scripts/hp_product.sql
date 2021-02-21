CREATE TABLE HP_PRODUCT
(
    ID uuid NOT NULL,
    SUPP_ID uuid NOT NULL,
    NAME	text COLLATE pg_catalog.default,
    DETAILS text COLLATE pg_catalog.default,
    PRICE  NUMERIC(5,2),
    IS_DELETED boolean,
    CREATED_BY text COLLATE pg_catalog.default,
    CREATED_DT timestamp with time zone,
    MODIFIED_BY text COLLATE pg_catalog.default,
    MODIFIED_DT timestamp with time zone,
    CONSTRAINT HP_PRODUCT_pkey PRIMARY KEY (ID)
)
WITH (
    OIDS = FALSE
)

INSERT INTO HP_PRODUCT(
	ID, SUPP_ID, NAME, DETAILS, PRICE,
	IS_DELETED, CREATED_BY, CREATED_DT, MODIFIED_BY, MODIFIED_DT)
	VALUES (uuid_generate_v4(),
			'3d0f4311-4d19-4216-b476-7dfc5cb0fbe7', 
			'HP 4-in-1 Color LaserJet Pro MFP M283fdw Printer',
            'Print, Scan, Copy, Fax, Wireless',
			596.01,
			false, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP);

            
INSERT INTO HP_PRODUCT(
	ID, SUPP_ID, NAME, DETAILS, PRICE,
	IS_DELETED, CREATED_BY, CREATED_DT, MODIFIED_BY, MODIFIED_DT)
	VALUES (uuid_generate_v4(),
			'3d0f4311-4d19-4216-b476-7dfc5cb0fbe7', 
			'3M Adjustable Monitor Stand w/Non-Skid Platform',
            'Ideal for Laptops, Printers or Monitors',
			52.25,
			false, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP);