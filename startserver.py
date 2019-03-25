import tornado.ioloop
import tornado.web
import os, sys


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        b = self.get_argument('size')
        c = self.get_argument('pattern')
        self.render("NN.html", pattern_size=int(b), classes=int(c))


settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "."),
    "autoreload": True
}

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler)
    ], **settings)

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
    
    
    
    
    