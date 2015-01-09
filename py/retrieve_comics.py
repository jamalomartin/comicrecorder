import json
import webapp2
import logging
import models
from google.appengine.api import users
from google.appengine.api import namespace_manager

class GetComicList(webapp2.RequestHandler):
	def get(self):
		namespace_manager.set_namespace(users.get_current_user().user_id())
		comic_entities = models.Comic.query().order(models.Comic.publisher).fetch(1000)  # list of Comic models
		comics = [  # list of comic dictionaries
			{'publisher': c.publisher,
			 'title': c.title,
			 'booknum': c.booknum,
			 'writer': c.writer,
			 'artist': c.artist,
			 'misc': c.misc,
			 'key': c.key.urlsafe()}
			 for c in comic_entities
		]
		self.response.write(json.dumps(comics))

app = webapp2.WSGIApplication([
    ('/py/retrieve_comics', GetComicList)
], debug=True)
