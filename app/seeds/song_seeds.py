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
]
song_images2=[
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
audio_arr = [
    'https://cap-nn-audio.s3.amazonaws.com/0f2ba08d4fff45268b0caa5e6f2c373f.mp3',
    'https://cap-nn-audio.s3.amazonaws.com/115aa61007a34f268a6159c28b2dfab5.mp3',
    'https://cap-nn-audio.s3.amazonaws.com/2107888facae4edda0821daf8a490461.mp3',
    'https://cap-nn-audio.s3.amazonaws.com/224c03c25c2747969d34fab8e5e1621a.mp3',
    'https://cap-nn-audio.s3.amazonaws.com/27c4af098c8e4f3fa1866188e57b3069.mp3',
    'https://cap-nn-audio.s3.amazonaws.com/2d7b1ca904594bf8ae02591dbe82837c.mp3',
    'https://cap-nn-audio.s3.amazonaws.com/71c15bf1553b4ab78d104676f0a13691.mp3',
    'https://cap-nn-audio.s3.amazonaws.com/46898fe6bffc4111a4dc73d9552c179f.mp3',
]




def seed_songs():
    newSongs = []

    demo_song = Song(
        title= 'Sumatra Soul',
        genre="Pop",
        user_id = 1,
        image_file= 'https://cdn.pixabay.com/photo/2019/05/04/15/24/woman-4178302_1280.jpg',
        image_name='sumatra_soul.jpeg',
        audio_file=audio_arr[3],
        audio_name='sumatra_soul.mp3',
        created_at= datetime.now()
    )
    newSongs.append(demo_song)

    for i in range(10):
        newSong = Song(
            title= song_titles[i],
            # genre= choice(["Rock","Electronic","Dirty Bass","Pop","Hip-Hop","Latino"]),
            genre="Electronic",
            user_id = randint(2,3),
            image_file = song_images[i],
            image_name = f"{song_images[i]}.jpeg",
            audio_file = choice(audio_arr),
            audio_name = f"{song_images[i]}.mp3",
            created_at = datetime.now()

        )
        newSongs.append(newSong)
        newSong2 = Song(
            title= song_titles[i],
            genre= "Dirty Bass",
            user_id = randint(2,3),
            image_file = song_images2[i],
            image_name = f"{song_images2[i]}.jpeg",
            audio_file = choice(audio_arr),
            audio_name = f"{song_images2[i]}.mp3",
            created_at = datetime.now()

        )
        newSongs.append(newSong2)

    db.session.add_all(newSongs)
    db.session.commit()

    db.session.add_all(newSongs)


    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()


cool_song_titles = [
    "Midnight Stroll",
    "Neon Dreams",
    "Electric Pulse",
    "Cosmic",
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
    "Celestial",
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

rock_song_img =[
    "https://www.angrymetalguy.com/wp-content/uploads/2015/09/My-Dying-Bride-Feel-the-Misery-01.jpg",
    "https://cdns-images.dzcdn.net/images/cover/865311af8981b1b289c2ad5682ac24aa/500x500-000000-80-0-0.jpg",
    "https://cdns-images.dzcdn.net/images/cover/f758768d4a8ca687ffda0432dd826dfb/264x264.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcYlt0eopgD6GpCHP4VmMTuq3O-xKH6Y-ImQ&usqp=CAU",
    "https://m.media-amazon.com/images/M/MV5BZThhMjk5MzAtYTkxNS00OTZlLWJkOTYtYjA1ZTNlZWVmNjI4XkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg",
    "https://i1.sndcdn.com/avatars-000136259137-3sjh0t-t500x500.jpg",
    "https://m.media-amazon.com/images/I/91ypp41UPoL._UF1000,1000_QL80_.jpg",
    "https://images.squarespace-cdn.com/content/v1/574d6cfac6fc0859c4528363/1568100913759-S1RBNTTX5REW5XT0D7CB/69_EYES_WEST_END_DIGI.jpg",
    "https://i.scdn.co/image/ab6761610000e5eb77ff93e72ef5545f41b4bb74",
    "https://f4.bcbits.com/img/a2278116213_65",
]

hh_song_img =[
    "https://www.killyourdarlings.com.au/wp-content/uploads/2020/07/horse-1.jpg",
    "https://plus.unsplash.com/premium_photo-1705091982102-89cf401cb797?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1708555298096-5b3f26f0e1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1706727291890-21aabd0cce3a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1708060195246-8fef752157e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1674582743901-7e438e0e5ea0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjJ8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1683009427660-b38dea9e8488?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMzF8fHxlbnwwfHx8fHw%3D",
    "https://plus.unsplash.com/premium_photo-1708110769720-eaf8397ccabe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNDJ8fHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1707057538379-d62783e77f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNjl8fHxlbnwwfHx8fHw%3D",
    "https://plus.unsplash.com/premium_photo-1706625675302-af4d4bd854ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxODJ8fHxlbnwwfHx8fHw%3D",
]
pop_song_img =[
    "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDV8cVBZc0R6dkpPWWN8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1676571185590-7467ee7f1572?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1480619110243-c94e677a8d2b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1687838935896-6f50da895e19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQwfHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1562313081-0e82b5729071?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1650923433332-64d9d6a9deb9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM2fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1650504158790-fe5c8cf13832?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://plus.unsplash.com/premium_photo-1706727288505-674d9c8ce96c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQzfHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1708006257435-3384f5305ce6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://plus.unsplash.com/premium_photo-1689703068866-5fcba89130ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
]
latino_song_img =[
    "https://plus.unsplash.com/premium_photo-1697232652942-5b43191a4015?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYzfHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1623607527805-cda6da0b9867?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDY3fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1643325299646-f1ee437ba1f7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDc2fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1621544170639-fb0189e518ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDgwfHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1669918246054-55ee17af9c63?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDg4fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
    "https://images.unsplash.com/photo-1616106310757-61250f09d170?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwNXxxUFlzRHp2Sk9ZY3x8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1707757580218-d89cf8e9c3b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExOHxxUFlzRHp2Sk9ZY3x8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1662673132131-436c045ed87f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyMHxxUFlzRHp2Sk9ZY3x8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1707597940395-3120bff73ae0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzNHxxUFlzRHp2Sk9ZY3x8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1707525711777-b547aae5bb85?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzMnxxUFlzRHp2Sk9ZY3x8ZW58MHx8fHx8",
]


def seed_songs2():


    for i in range(10):
        # new_songs_arr = []

        new_songs =[
            Song(
                title=choice(cool_song_titles),  # Generate a random cool song title
                genre="Hip-Hop",
                user_id=randint(2, 3),
                image_file= hh_song_img[i],
                image_name = f"{hh_song_img[i]}.jpeg",
                audio_file = choice(audio_arr),
                audio_name = f"{hh_song_img[i]}.mp3",
                created_at=datetime.now()
            ),

            Song(
                title=choice(cool_song_titles),
                genre='Rock',
                user_id=randint(2, 3),
                image_file= rock_song_img[i],
                image_name = f"{rock_song_img[i]}.jpeg",
                audio_file = choice(audio_arr),
                audio_name = f"{rock_song_img[i]}.mp3",
                created_at=datetime.now()
            ),
            Song(
                title=choice(cool_song_titles),
                genre='Latino',
                user_id=randint(2, 3),
                image_file=latino_song_img[i],
                image_name = f"{latino_song_img[i]}.jpeg",
                audio_file = choice(audio_arr),
                audio_name = f"{latino_song_img[i]}.mp3",
                created_at=datetime.now()
            ),
            Song(
                title=choice(cool_song_titles),
                genre="Pop",
                user_id=randint(2, 3),
                image_file=pop_song_img[i],
                image_name = f"{pop_song_img[i]}.jpeg",
                audio_file = choice(audio_arr),
                audio_name = f"{pop_song_img[i]}.mp3",
                created_at=datetime.now()
            ),
        ]

        # new_songs_arr.append(new_songs)
        db.session.add_all(new_songs)
    db.session.commit()



def undo_songs2():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
