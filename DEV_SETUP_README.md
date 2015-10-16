# MongoDB Setup
In order to use MongoDB, you'll need to install it.
* ...
* Run `mongod --dbpath data` (you will need to do this every time you work)

# Redis setup
* Run `brew install redis`
* Then run `ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents` so it will launch redis at login
* Run `launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist` to load redis right away 
