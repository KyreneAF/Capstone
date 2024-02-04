from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime


class Song(db.Model, UserMixin):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    comments = db.relationship('Comment', back_populates='song')
    liked_songs = db.relationship('LikedSong', back_populates='song')
    uploader = db.relationship('User', back_populates='songs')
    audio_file = db.relationship('SongFile', back_populates='audio',cascade='all, delete-orphan')
    image_file = db.relationship('ImageFile', back_populates='image',cascade='all, delete-orphan')


    def to_dict(self):
        song_dict = {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'user_id': self.uploader.to_dict(),
            'created_at': self.created_at,
            'audio' : self.audio_file.to_dict(),
            'image': self.image_file.to_dict(),
            'num_likes': len(self.liked_songs)
        }
        return song_dict
