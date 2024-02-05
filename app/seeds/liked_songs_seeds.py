from app.models import db, LikedSong, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint
from datetime import datetime





def seed_liked_songs():
    new_liked_songs = []

    for i in range(20):
        new_liked_song = LikedSong(
            user_id = randint(1,4),
            song_id = randint(1,20),
            created_at = datetime.now()

        )
        new_liked_songs.append(new_liked_song)
    db.session.add_all(new_liked_songs)

    db.session.commit()


def undo_liked_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.liked_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM liked_songs"))

    db.session.commit()
