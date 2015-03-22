import json
import webapp2
import logging
from models import Comic
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import namespace_manager

class PostComicList(webapp2.RequestHandler):
	def post(self):
		namespace_manager.set_namespace(users.get_current_user().user_id())
		logging.warn(users.get_current_user().user_id())
		comic = json.loads(self.request.body)
		

		print comic;
		newComic = Comic(
			artist=comic.get('artist'),
			publisher=comic.get('publisher'),
			writer=comic.get('writer'),
			title=comic.get('title'),
			booknum=comic.get('booknum'),
			misc=comic.get('misc'),
			comicType=comic.get('comicType')
    	)
		newComic.put()
		self.response.out.write('success')

app = webapp2.WSGIApplication([
    ('/py/record_comics', PostComicList)
], debug=True)
