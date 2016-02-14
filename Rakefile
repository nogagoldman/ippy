require 'dm-migrations'

task default: %w[routes]

desc "List all routes"
task :routes do
  puts `grep '^[get|post|put|delete].*do$' app/*.rb | sed 's/ do$//'`
end

desc "migrates the db"
task :migrate do
  require './db'
  DataMapper.auto_migrate!
end

desc "upgrades the db"
task :upgrade do
  require './db'
  DataMapper.auto_upgrade! 
end

desc "runs the server using rerun"
task :up do
  `rerun 'rackup config.ru'`
end
