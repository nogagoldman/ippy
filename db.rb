require 'sinatra'
require 'data_mapper'

DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/ippy.db")

class Ippy
  include DataMapper::Resource
  property :id, Serial
  property :content, String, :required => true
  property :happiness, Integer, :required => false, :default => 0
  property :views, Integer, :default => 0
  property :created_at, DateTime
end
DataMapper.finalize
