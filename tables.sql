SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
--change name of table to notebook

CREATE TABLE public.notebook (
	  "_id" serial PRIMARY KEY,
	  "name" varchar,
    "description" varchar,
	  "date_created" varchar,
    "shared_with" varchar,
    PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

--created new notes table
CREATE TABLE public.notes (
	"_id" serial PRIMARY KEY,
	"notebook_id" bigint,
  "textbox" varchar,
	"date_created" varchar,
  "shared_with" varchar,
	PRIMARY KEY ("_id"),
  CONSTRAINT "fk_notebook"
    FOREIGN KEY("notebook_id")
      REFERENCES public.notebook("_id")
) WITH (
  OIDS=FALSE
);

--created new skills table
CREATE TABLE public.skills (
	"_id" serial PRIMARY KEY,
	"notebook_id" bigint,
  "name" varchar,
	"rating" integer,
	PRIMARY KEY ("_id"),
  CONSTRAINT "fk_notebook"
    FOREIGN KEY("notebook_id")
      REFERENCES public.notebook("_id")
) WITH (
  OIDS=FALSE
);

--created new reminders table
CREATE TABLE public.reminders (
	"_id" serial PRIMARY KEY,
	"notebook_id" bigint,
  "description" varchar,
	"date_created" varchar,
  "time" varchar,
	PRIMARY KEY ("_id"),
   CONSTRAINT "fk_notebook"
    FOREIGN KEY("notebook_id")
      REFERENCES public.notebook("_id")
) WITH (
  OIDS=FALSE
);