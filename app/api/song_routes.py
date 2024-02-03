from flask import Blueprint, request,abort
from app.models import db, Song
from flask_login import current_user, login_required
from app.forms import SongForm

# from app.api.aws_helpers.aws_upload import (upload_file_to_s3_images, upload_file_to_s3_audio, get_unique_filename)
from app.api.aws_helpers import (upload_file_to_s3_images, upload_file_to_s3_audio, get_unique_filename, remove_file_from_s3_images, remove_file_from_s3)

song_routes = Blueprint("songs", __name__)

# GET ALL SONGS
@song_routes.route("/", methods=["GET"])
def get_all_songs():
    songs = Song.query.order_by(Song.created_at).all()
    if not songs:
        return {"message":"Songs do not exist"}, 404
    songs_to_dict = [song.to_dict() for song in songs]
    return {"songs":songs_to_dict}

# GET SONGS OF CURRENT USER
@song_routes.route("/current", methods=["GET"])
@login_required
def get_all_current_songs():

    songs = Song.query.filter(current_user.id == Song.user_id).order_by(Song.created_at).all()
    if not songs:
        return {"message":"Songs do not exist"}, 404
    songs_to_dict = [song.to_dict() for song in songs]
    return {"songs":songs_to_dict}





# POST NEW SONG
@song_routes.route("/new", methods=["POST"])
@login_required
def create_song():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not current_user:
        return {"message":  "Current user not logged in"}
    # song = Song.query.filter(and_(Song.user_id == current_user.id, Song.audio_file == form.data['audio'])).first()
    # if song:
    #     return {"message": "This song already exists"}
    if form.validate_on_submit():

        image = form.data["image"]
        audio = form.data["audio"]
        image.filename = get_unique_filename(image.filename)
        audio.filename = get_unique_filename(audio.filename)
        image_upload = upload_file_to_s3_images(image)
        audio_upload = upload_file_to_s3_audio(audio)
        print(image_upload)
        print(audio_upload)


        if "url" not in image_upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return {"message":"error uploading image file"}
        if "url" not in audio_upload:
            return {"message": "error uploading audio file"}

        new_song = Song(
            title = form.data["title"],
            genre = form.data["genre"],
            image_file = image_upload["url"],
            audio_file = audio_upload["url"],
            user_id = current_user.id
        )

        db.session.add(new_song)
        db.session.commit()

        return {"song":new_song.to_dict()},201

    else:
        return {"errors": form.errors}, 400


# EDIT SONG
@song_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_song(id):

    song = Song.query.get(id)
    if not song:
        return {"message": "Song doesn't exist"},404
    if not current_user:
        return {"message":  "Current user not logged in"},403
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        #change song from db to the new data in the form
        song.title = form.data["title"]
        song.genre = form.data["genre"]

        #set new image & audio from the incoming from
        image = form.image.data
        audio = form.audio.data
        #check if there is an incoming image & audio
        if image and audio:
        #delete old image and audio from old song
            remove_file_from_s3_images(song.image_file)
            remove_file_from_s3(song.audio_file)
        #assign filename property to a unique name
        image.filename = get_unique_filename(image.filename)
        audio.filename = get_unique_filename(audio.filename)
        #upload to aws
        new_image_upload = upload_file_to_s3_images(image)
        new_audio_upload = upload_file_to_s3_audio(audio)
        print(new_image_upload)
        print(new_audio_upload)


        if "url" not in new_image_upload:
            return {"message":"error uploading image file"},401
        if "url" not in new_audio_upload:
            return {"message": "error uploading audio file"},401
        #change old song to new image and commit
        song.image_file = new_image_upload["url"]
        song.audio_file = new_audio_upload["url"]


        db.session.commit()
        return {"song": song.to_dict()},201

    else:
        return {"errors": form.errors}, 400


# DELETE SONG
@song_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_song(id):

    song = Song.query.get(id)

    if not current_user:
        return {"message": "current user not logged in"}, 403
    if not song:
        abort(404, {"message": "Song does not exist"})
    if current_user.id != song.user_id:
        return {"message": "Current user not owner of Song!"}, 403
    remove_file_from_s3_images(song.image_file)
    remove_file_from_s3(song.audio_file)

    db.session.delete(song)
    db.session.commit()
    return {"deleted song": song.to_dict(), "message": "successfully deleted"}
