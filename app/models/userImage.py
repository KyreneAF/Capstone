from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class UserImage(db.Model, UserMixin):
    __tablename__ = 'user_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')) ,nullable=False)
    image_file = db.Column(db.String(255), nullable=False)
    image_file_name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='profile_image')

    def to_dict(self):
        user_image_dict = {
            'id': self.id,
            'user_id': self.user.to_dict(),
            'image_file': self.image_file,
            'image_file_name': self.image_file_name,
            'created_at': self.created_at
        }
        return user_image_dict
