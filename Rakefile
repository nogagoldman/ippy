task default: %w[up]

task :migrate do
  require 'data_mapper'
  require './db'
  DataMapper.auto_migrate!
end

task :up do
  `rackup`
end
