# Node Setup
* ... we all have this done, so leaving this part out for now

# MongoDB Setup
* You should be able to install MongoDB with Brew using `brew install mongodb`
* From there, as described below with Redis, follow the instructions to run MongoDB at login and at that moment. (Sorry, I've already installed it, so not sure what the exact commands are.)
* Create a 'data' directory within your Lounge project. This is where your MongoDB data will be stored. data is included in your `.gitignore` file so it won't be included in your changes.
* Run `mongod --dbpath data` (you will need to do this every time you work - maybe, but maybe not if you run MongoDB at login. Try not doing this, if your server doesn't run, then do it).
* Running `mongod` will open up the Mongo shell which will allow you to run queries such as `db.events.find({})` which can be useful for inspecting or altering data in your DB. Some intro info is available [here](http://docs.mongodb.org/manual/tutorial/getting-started-with-the-mongo-shell/).

# Redis setup
* Run `brew install redis`
* Then run `ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents` so it will launch redis at login
* Run `launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist` to load redis right away 
