import json
import webapp2
import logging
from models import Comic
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import namespace_manager

class DeleteComic(webapp2.RequestHandler):
	def delete(self):
		namespace_manager.set_namespace(users.get_current_user().user_id())
		key_str = self.request.url[self.request.url.rfind('/')+1:]
		key = ndb.Key(urlsafe=key_str)
		key.delete()

app = webapp2.WSGIApplication([
	('/py/delete_comic.*', DeleteComic)
], debug=True)
