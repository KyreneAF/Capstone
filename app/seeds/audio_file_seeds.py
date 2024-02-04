from app.models import db, SongFile, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, randint

audio_arr = [
    "placeholder",
    "placeholder",
    "placeholder",
]



def seed_song_files():
    new_song_file = []

    for i in range(1,21):
        new_audio = SongFile(
            song_id = i,
            audio_file = choice(audio_arr),

        )
        new_song_file.append(new_audio)

    db.session.add_all(new_song_file)
    db.session.commit()


def undo_song_files():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.song_files RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM song_files"))

    db.session.commit()
