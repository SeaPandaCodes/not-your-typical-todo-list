# 🐳 Not Your Typical To-Do List

### Upgrade your to-do list to become a reward-based system!

Organize your tasks by difficulty and score higher points for completing more complex tasks.\
Create a list of rewards that match your task difficulty.

Completing tasks will build up your reward points.\
Redeem these points for a 10, 30, or 60 point reward.

The reward will be randomly selected from your list. But feel free to re-roll if you want something different.

Not happy with any of your reward choices just close the popup and switch to the reward tab to add some more.\
Your points will not be spent unless you click the redeem button.

(This page is fully responsive so check it out on your tablet or mobile device!)

Built With:

- TypeScript
- React
- Next.js
- Chakra UI
- tRPC
- JWT Tokens
- PostgreSQL
- HTML Canvas

This project was deployed with Railway 🚂

Extra Fun:\
You can hover over the waves at the bottom to see them pick up speed! 🌊\
Toggle the color mode to see the fish switch positions 🐟

## Running This Project

### Setting up the PostgreSQL Database

You will need to have docker running on your device to use docker-compose.\
(If you already have a server running feel free to create the postgreSQL database on there)

First update the .env.sample file with a username, password, and a random string for the JWT_SECRET.\
Then rename the file to .env

Make sure docker is open and running then run `docker-compose up`

With your preferred database tool connect to the postgreSQL server.\
The connection credentials are located in the .env file.

Once connected run the following to create the necessary tables:

```sql
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
```

### Running the Page

While `docker-compose up` is running, open a new terminal.\
Run `yarn` to download the packages.\
Run `yarn dev` to start

The page will be running on `localhost:3000`
