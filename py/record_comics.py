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
		comics = json.loads(self.request.body)
		
		comic_entities = []

		for comic in comics:
			newComic = Comic(
				publisher=comic.get('publisher'),
				title=comic.get('title'),
				booknum=comic.get('booknum'),
				writer=comic.get('writer'),
				artist=comic.get('artist'),
				misc=comic.get('misc')
	    	)
			comic_entities.append(newComic)
		ndb.put_multi(comic_entities)
		self.response.out.write('success')

app = webapp2.WSGIApplication([
    ('/py/record_comics', PostComicList)
], debug=True)
