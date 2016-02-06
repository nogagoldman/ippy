require 'sinatra'
require 'sinatra/json'
require './db'
require './helpers'

# home page
get '/' do
  @ippys = Ippy.all
  erb :index
end

# create new ippy
post '/ippy' do
  ippy = Ippy.create(content: h(params["content"]))
  if ippy.save
    status 200
  else
    status 400
  end
end

# count a view/click
post '/ippy/:id' do
  ippy = Ippy.get(params[:id])
  ippy.views += 1
  if ippy.save
    status 200
  else
    status 400
  end
end

# get all ippys
get '/ippy' do
  ippys = Ippy.all
  json :ippys => ippys
end

# delete an ippy
delete '/ippy/:id' do
  halt 404 unless params['password'] == get_password

  ippy = Ippy.get(params[:id])
  if ippy.destroy
    status 200
  else
    status 400
  end
end
