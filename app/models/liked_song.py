from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime


class LikedSong(db.Model, UserMixin):
    __tablename__ = 'liked_songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')) ,nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship("User", back_populates="liked_songs")
    song = db.relationship("Song", back_populates="liked_songs")

    def to_dict(self):


        song_dict = {
            "id": self.id,
            "user": self.user_id,
            "song": self.song_id,
            "created_at": self.created_at
        }

        return song_dict
