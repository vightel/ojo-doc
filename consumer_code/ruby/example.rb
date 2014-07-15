require "fb_graph"
require "hawk"
require "rest_client"

app = FbGraph::Application.new(ID, :secret => SECRET)
app.get_access_token
puts app.access_token

credentials = { :id => ID, :key => app.get_access_token.to_s, :algorithm => 'sha256' }

url = "http://ojo-bot.herokuapp.com/products/opensearch?q=landslide_forecast&lat=18.89&lon=-69.96&startTime=2014-05-05&endTime=2014-06-04&limit=1"

auth_header = Hawk::Client.build_authorization_header(
   :credentials => credentials,
   :method => 'GET',
   :request_uri => '/products/opensearch?q=landslide_forecast&lat=18.89&lon=-69.96&startTime=2014-05-05&endTime=2014-06-04&limit=1',
   :host => 'ojo-bot.herokuapp.com',
   :port => 80,
   :ext => 'matt.e.handy@gmail.com'
  )

puts auth_header

puts RestClient.get url, params: auth_header