-- This PostgreSQL assignment cast is necessary because PostgreSQL does not automatically cast strings into
-- enumerated types when the strings are provided via parameterized queries. See more in the following GitHub
-- thread: https://github.com/pgjdbc/pgjdbc/issues/265
CREATE CAST (character varying AS priority) WITH INOUT AS ASSIGNMENT;
