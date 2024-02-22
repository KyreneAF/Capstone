from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import randint,choice
from datetime import datetime




cool_song_titles = [
    "Midnight Stroll",
    "Neon Dreams",
    "Electric Pulse",
    "Cosmic Serenade",
    "Velvet Horizon",
    "Sapphire Skies",
    "Lunar Lullaby",
    "Echoes of Euphoria",
    "Stardust Symphony",
    "Radiant Reverie",
    "Serendipity Serenade",
    "Twilight Tango",
    "Enigmatic Elixir",
    "Melodic Mirage",
    "Celestial Serenade",
    "Urban Odyssey",
    "Funky Fusion",
    "Soulful Solstice",
    "Jazz Noir",
    "Groove Galaxy",
    "Electric Oasis",
    "Chillwave Cascade",
    "Sonic Solitude",
    "Rhythmic Rhapsody",
    "Moonlit Melody",
    "Enchanted Echo",
    "Neon Nightscape",
    "Dreamwave Delight",
    "Cosmic Carousel",
    "Enigmatic Enclave",
    "Midnight Melancholy",
    "Radiant Rhythm",
    "Serene Serenade",
    "Starlit Sonata",
    "Sonic Symphony",
    "Luminous Lullaby",
    "Cityscape Serenity",
    "Azure Aria",
    "Velvet Vortex",
    "Groove Grotto"
]






def seed_songs2():
    faker = Faker()

    for i in range(10):
        random_number = randint(1000, 2000)  # Generate a new random number for Unsplash signature

        new_songs = [
            Song(
                title=choice(cool_song_titles),  # Generate a random cool song title
                genre="Hip-Hop",
                user_id=randint(1, 3),
                image_url=f'https://source.unsplash.com/500x500/?cool&sig={random_number}',
                audio_file=f"placeholder{i}",
                created_at=datetime.now()
            ),
            Song(
                title=faker.catch_phrase(),
                genre='Rock',
                user_id=randint(1, 3),
                image_url=f'https://source.unsplash.com/500x500/?cool&sig={random_number}',
                audio_file=f"placeholder{i}",
                created_at=datetime.now()
            ),
            Song(
                title=faker.catch_phrase(),
                genre='Latino',
                user_id=randint(1, 3),
                image_url=f'https://source.unsplash.com/500x500/?cool&sig={random_number}',
                audio_file=f"placeholder{i}",
                created_at=datetime.now()
            ),
            Song(
                title=faker.catch_phrase(),
                genre="Pop",
                user_id=randint(1, 3),
                image_url=f'https://source.unsplash.com/500x500/?cool&sig={random_number}',
                audio_file=f"placeholder{i}",
                created_at=datetime.now()
            ),
            Song(
                title=faker.catch_phrase(),
                genre="Latino",
                user_id=randint(1, 3),
                image_url=f'https://source.unsplash.com/500x500/?cool&sig={random_number}',
                audio_file=f"placeholder{i}",
                created_at=datetime.now()
            )
        ]

        db.session.add_all(new_songs)
        db.session.commit()



def undo_songs2():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
