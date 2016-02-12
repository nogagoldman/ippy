require 'sinatra'
require 'sinatra/json'
require './db'
require './helpers'

# home page
get '/' do
  @ippys = get_ippys :popular
  erb :index
end

# new
get '/new' do
  @ippys = get_ippys :new
  erb :index
end

# random
get '/random' do
  @ippys = get_ippys :random
  erb :index
end

# create new ippy
post '/ippy' do
  ippy = Ippy.create(content: h(params['content']))
  if ippy.save
    status 200
    erb :_ippy, :locals => { :ippy => ippy }
  else
    status 400
  end
end

# count a view (click)
get '/ippy/:id' do
  ippy = Ippy.get(params[:id])
  ippy.views += 1
  if ippy.save
    status 200
  else
    status 400
  end
end

# get all ippys (paginated)
get '/ippy.?:format?' do
  order = params[:order_by].to_sym || :new
  @ippys = get_ippys order

  if params[:format] == 'json'
    json :ippys => @ippys
  else
    erb :_ippy_collection
  end
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
