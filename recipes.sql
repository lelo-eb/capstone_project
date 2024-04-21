\echo 'Delete and recreate recipes db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE recipes;
CREATE DATABASE recipes;
\connect recipes

\i recipes-schema.sql
\i recipes-seed.sql

\echo 'Delete and recreate recipes_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE recipes_test;
CREATE DATABASE recipes_test;
\connect recipes_test

\i recipes-schema.sql