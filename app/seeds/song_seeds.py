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

song_images = [

   "https://media.istockphoto.com/id/1470449204/photo/aerial-view-of-a-residential-complex-with-rainbow-houses-on-the-left-bank-of-kyiv.jpg?s=612x612&w=0&k=20&c=tXJO4QNgcRo2OOKdNmhlE6SOObW-WqwBtpydqwjvC3Q=",
   "https://media.istockphoto.com/id/1441933360/photo/modern-abstract-wavy-background.jpg?s=612x612&w=0&k=20&c=hqFtcdWN0vm4-_oWhYGUmVP-KVaKbNCsRyBrN8KctD4=",
   "https://media.istockphoto.com/id/1420952272/photo/ice-on-diamond-beach-in-iceland.jpg?s=612x612&w=0&k=20&c=-WpEmrqzdRG4ZsqqzeurpkOxc5LwhVofbqF_pFtUtQs=",
   "https://media.istockphoto.com/id/1464149146/photo/abstract-data-background.jpg?s=612x612&w=0&k=20&c=AizppiF6AN-uEF4XKgQdXYLHBrZfNFblxKxX27ybZic=",
   "https://t4.ftcdn.net/jpg/05/29/10/45/240_F_529104548_n9fA1cPIELcFUNzs0pll3zsMfSKrPDOC.jpg",
   "https://t4.ftcdn.net/jpg/04/79/07/37/240_F_479073749_cTiJ8vaCrzkU3zW0XDgT7U5oCXnIw3aa.jpg",
   "https://t4.ftcdn.net/jpg/05/51/01/61/240_F_551016145_XQ04Chty2gU8mEBcbSXQtsQe9a9peFW2.jpg",
   "https://t3.ftcdn.net/jpg/06/57/91/36/240_F_657913630_C3RB4RIP8avKDsmQsNdmQT2VLMevNU4k.jpg",
   "https://t3.ftcdn.net/jpg/05/85/34/62/240_F_585346295_9ujTQ7z5URNq6FSgCtIouvwYtIax1Pp7.jpg",
   "https://t4.ftcdn.net/jpg/05/52/88/81/240_F_552888181_ZrwROuxif7eNoB5RqPMCau9op6k28Fqx.jpg",
   "https://images.pexels.com/photos/19955505/pexels-photo-19955505/free-photo-of-two-televisions-on-a-table-with-a-tree-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
   "https://images.pexels.com/photos/18500583/pexels-photo-18500583/free-photo-of-woman-with-her-hair-braided-into-horns.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
   "https://images.pexels.com/photos/5930027/pexels-photo-5930027.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
   "https://images.pexels.com/photos/14024153/pexels-photo-14024153.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
   "https://images.pexels.com/photos/18293431/pexels-photo-18293431/free-photo-of-a-woman-surfing.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
   "https://images.pexels.com/photos/13060862/pexels-photo-13060862.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
   "https://images.pexels.com/photos/14121867/pexels-photo-14121867.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
   "https://images.pexels.com/photos/10321695/pexels-photo-10321695.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
   "https://images.pexels.com/photos/18173019/pexels-photo-18173019/free-photo-of-two-pink-and-white-lollipops-on-sticks.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
   "https://images.pexels.com/photos/18160979/pexels-photo-18160979/free-photo-of-sitting-on-the-air.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
]

audio=[
    "https://pixabay.com/music/beautiful-plays-inspiring-cinematic-ambient-116199/",
    "https://discord.com/channels/@me/1176971554152775812/1203109324797251674",
    "https://pixabay.com/music/beats-sunshine-bliss-181126/",
    "https://pixabay.com/music/future-bass-titanium-170190/",
    "https://pixabay.com/music/future-bass-lifelike-126735/",
    "https://pixabay.com/music/future-bass-mellow-future-bass-bounce-on-it-184234/",
    "https://pixabay.com/music/future-bass-trap-future-bass-royalty-free-music-167020/",
    "https://pixabay.com/music/future-bass-modern-vlog-140795/",
    "https://pixabay.com/music/future-bass-lifelike-126735/",
    "https://pixabay.com/music/future-bass-leonell-cassio-chapter-two-ft-carrie-114909/",
    "https://pixabay.com/music/future-bass-let-it-go-12279/",
    "https://pixabay.com/music/future-bass-soul-future-bass-royalty-free-music-188687/",
    "https://pixabay.com/music/future-bass-embrace-12278/",
    "https://pixabay.com/music/beats-tuesday-glitch-soft-hip-hop-118327/",
    "https://pixabay.com/music/beats-the-blade-1min-34sec-187351/",
    "https://pixabay.com/music/beats-glossy-168156/",
    "https://pixabay.com/music/beats-relaxed-vlog-night-street-131746/",
    "https://pixabay.com/music/beats-venice-story-30sec-187345/",
    "https://pixabay.com/music/future-bass-powerful-beat-121791/",
    "https://pixabay.com/music/future-bass-sexy-chillout-hip-hop-track-come-with-me-133764/",

]





def seed_songs():
    newSongs = []

    for i in range(20):
        newSong = Song(
            title= song_titles[i],
            genre= choice(["Rock","Electronic","Dirty Bass","Pop","Hip-Hop","Latino"]),
            image_file =  song_images[i],
            audio_file = audio[i],
            user_id = randint(1,13),
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
