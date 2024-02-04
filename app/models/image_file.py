from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime


class ImageFile(db.Model, UserMixin):
    __tablename__ = 'image_files'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    image_file = db.Column(db.String(255), nullable=False)

    image = db.relationship('Song', back_populates='image_file' )

    def to_dict(self):
        song_dict = {
            'id': self.id,
            'song_id' : self.song_id.to_dict(),
            'image_file' : self.image_file
        }
        return song_dict
