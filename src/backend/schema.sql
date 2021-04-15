-- author: peekaykun; Date: 2021-04-14;

--
-- Name: kbking; type: user;
--
create user kbking with password 'password';

--
-- Name: abs_everywhere; Type: database;
--
drop database if exists abs_everywhere;
create database abs_everywhere;
\c abs_everywhere;


ALTER DATABASE abs_everywhere OWNER TO kbking;

--
-- Name: mass_unit; type: ENUM
--
CREATE TYPE mass_unit_enum as ENUM ('kilograms', 'pounds');

--
-- Name: exercise_type; type: ENUM
--
CREATE TYPE exercise_type_enum as ENUM ('ballistic', 'grind');


--
-- Name: loading; type: ENUM
--
CREATE TYPE loading_enum as ENUM ('bilateral', 'unilateral');


--
-- Name: training_method; type: ENUM
--
CREATE TYPE training_method_enum as ENUM ('EMOM', 'No Rest', 'With Rest');


--
-- Name: training_method; type: ENUM
--
CREATE TYPE days_enum as ENUM ('monday', 'tuesday', 'wednesday',
  'thursday', 'friday', 'saturday', 'sunday');

--
-- Name: programme; type: table;
--
CREATE TABLE "public".programme (
  id SERIAL PRIMARY KEY,
  exercise_name VARCHAR(255) NOT NULL,
  equipment VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  mass INTEGER NOT NULL,
  mass_unit mass_unit_enum NOT NULL,
  reps INTEGER NOT NULL,
  baseline_sets INTEGER NOT NULL,
  target_sets INTEGER NOT NULL,
  days TEXT [],
  progression NUMERIC(10, 3) NOT NULL,
  loading loading_enum,
  exercise_type exercise_type_enum,
  training_method training_method_enum,
  rest INTEGER NULL
);


--
-- Name: schedule; type: table;
--
CREATE TABLE "public".schedule (
  id SERIAL PRIMARY KEY,
  programme_id INTEGER NOT NULL,
  week_number INTEGER NOT NULL,
  training_date DATE NOT NULL DEFAULT CURRENT_DATE,
  day days_enum,
  exercise VARCHAR(255),
  instrument VARCHAR(255),
  mass INTEGER,
  mass_unit mass_unit_enum,
  sets INTEGER NOT NULL,
  reps INTEGER NOT NULL,
  exercise_type exercise_type_enum,
  training_method training_method_enum,
  work_capacity INTEGER NOT NULL,
  comments TEXT,

  CONSTRAINT programme_schedule
    FOREIGN KEY (programme_id)
      REFERENCES programme(id)
);


GRANT ALL PRIVILEGES ON DATABASE "abs_everywhere" TO kbking;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA "public" TO kbking;
