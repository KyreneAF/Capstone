from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint,choice
from datetime import datetime




song_titles = [

    "Ephemeral Echoes",
    "Whispers in the Rain",
    "Stardust Serenade",
    "Midnight Mirage",
    "Crimson Horizon",
    "Sapphire Dreams",
    "Silent Symphony",
    "Lunar Lullaby",
    "Enchanted Embrace",
    "Celestial Cascade",
    "Echoes of Eternity",
    "Serenity's Spell",
    "Harmony of the Cosmos",
    "Twilight Reverie",
    "Mystic Melancholy",
    "Ripples in the Twilight",
    "Aurora's Awakening",
    "Whirlwind Waltz",
    "Solaris Sonata",
    "Oceanic Overture"
]





def seed_songs():
    newSongs = []

    for i in range(20):
        newSong = Song(
            title= song_titles[i],
            genre= choice(["Rock","Electronic","Dirty Bass","Pop","Hip-Hop","Latino"]),
            user_id = randint(1,4),
            created_at = datetime.now()

        )
        newSongs.append(newSong)

    db.session.add_all(newSongs)
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
