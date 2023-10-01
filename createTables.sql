CREATE TABLE IF NOT EXISTS tasks (
	id character varying(32) NOT NULL,
	user_id character varying(32) NOT NULL,
	name character varying(512) NOT NULL,
	max_redemptions integer,
	points integer NOT NULL,
	deleted boolean NOT NULL,
	CONSTRAINT rewards_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS rewards (
	id character varying(32) NOT NULL,
	user_id character varying(32) NOT NULL,
	name character varying(512) NOT NULL,
	completed_at timestamp,
	points integer NOT NULL,
	CONSTRAINT tasks_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS redemptions (
	id character varying(32) NOT NULL,
	user_id character varying(32) NOT NULL,
	reward_id character varying(32) NOT NULL,
	redeemed_at timestamp NOT NULL,
	CONSTRAINT redemptions_pk PRIMARY KEY (id)
);
