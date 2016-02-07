require 'fileutils'

# get password
def get_password
  FileUtils.touch('password')
  pw = File.foreach('password').first(1)[0]
  pw = pw.strip if pw != nil
  return pw
end 

# html escape
def h(text)
  Rack::Utils.escape_html(text)
end

# server static html file from public
def html(view)
  File.read(File.join('public', "#{view.to_s}.html"))
end

DEFAULT_PER_PAGE = 30

# paginated based on per_page
# orders: new, popular, random
def get_ippys(order)
  @page        = (params[:page] || 1).to_i
  @per_page    = (params[:per_page] || DEFAULT_PER_PAGE).to_i
  
  if order == :new
    # get new
    ippys = Ippy.all :order => [:created_at.desc], :limit => @per_page, :offset => @page - 1
  elsif order == :popular
    # get popular
    ippys = Ippy.all :order => [:views.desc], :limit => @per_page, :offset => @page - 1
  elsif order == :random
    # get random
    #ippys = Ippy.all.shuffle[0..DEFAULT_PER_PAGE] # slow
    ippys = DataMapper.repository.adapter.select('SELECT * from ippies ORDER BY RANDOM() LIMIT ?', DEFAULT_PER_PAGE)
  end

  @order_by = order

  return ippys
end
