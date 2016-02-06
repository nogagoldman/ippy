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
