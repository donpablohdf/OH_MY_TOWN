  
import os
from flask_admin import Admin
from .models import db, Users, Actividades, Reservas, Comentarios
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='OH MY TOWN Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Users, db.session))

    # You can duplicate that line to add mew models
    admin.add_view(ModelView(Actividades, db.session))
    admin.add_view(ModelView(Reservas, db.session))
    admin.add_view(ModelView(Comentarios, db.session))