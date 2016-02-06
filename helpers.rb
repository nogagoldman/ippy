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

# TODO: optimize this
def paginate(query)
  @page        = (params[:page] || 1).to_i
  @per_page    = (params[:per_page] || DEFAULT_PER_PAGE).to_i

  @pages       = query.chunks_of(@per_page)
  @total_count = @pages.count
  @page_count  = @pages.length

  # no more pages
  if @page > @page_count
    return []
  end

  @pages[@page - 1]
end

# paginated based on per_page
# orders: new, popular, random
def get_ippys(order)
  if order == 'new'
    ippys = paginate(Ippy.all(:order => [:created_at.desc]))
  elsif order == 'popular'
    ippys = paginate(Ippy.all(:order => [:views.desc]))
  elsif order == 'random'
    per_page = (params[:per_page] || DEFAULT_PER_PAGE)
    ippys = Ippy.all(:limit => per_page).shuffle
  end

  @order_by = order

  return ippys
end
