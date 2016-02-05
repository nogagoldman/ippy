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
