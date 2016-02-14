require 'sinatra'
require 'sinatra/json'

set :views, Proc.new { File.join(root, "app/views") }

Dir["./app/*.rb"].each { |file| require file }
