CREATE TABLE HP_MSG_STATUS
(
    ID uuid NOT NULL,
    MSG_ID text UNIQUE,
    CATEGORY text COLLATE pg_catalog.default,
    TXN_ID text COLLATE pg_catalog.default,
    STATUS	text COLLATE pg_catalog.default,
    ERR_MSG text COLLATE pg_catalog.default,
    IS_DELETED boolean,
    CREATED_BY text COLLATE pg_catalog.default,
    CREATED_DT timestamp with time zone,
    MODIFIED_BY text COLLATE pg_catalog.default,
    MODIFIED_DT timestamp with time zone,
    CONSTRAINT HP_MSG_STATUS_pkey PRIMARY KEY (ID)
)
WITH (
    OIDS = FALSE
)
`INSERT INTO HP_MSG_STATUS(
        ID, MSG_ID, CATEGORY, TXN_ID, STATUS
        IS_DELETED, CREATED_BY, CREATED_DT, MODIFIED_BY, MODIFIED_DT)
        VALUES (uuid_generate_v4(),
            $1, 
            $2,
            $3,
            $4,
            false, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP) RETURNING ID;