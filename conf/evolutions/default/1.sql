# --- !Ups

CREATE TABLE Account (
   uuid VARCHAR NOT NULL,
   username VARCHAR NOT NULL,
   email VARCHAR NOT NULL,
   PRIMARY KEY (uuid),
   CONSTRAINT UQ__users__username UNIQUE (username),
   CONSTRAINT UQ__users__email UNIQUE (email)
);


# --- !Downs

DROP TABLE Account;
