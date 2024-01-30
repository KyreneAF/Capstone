from flask import Blueprint, request,render_template
from app.models import db, Image
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3_images, upload_file_to_s3_audio, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()

    if form.validate_on_submit():

        image = form.data["image"]
        audio = form.data["audio"]
        image.filename = get_unique_filename(image.filename)
        audio.filename = get_unique_filename(audio.filename)
        image_upload = upload_file_to_s3_images(image)
        audio_upload = upload_file_to_s3_audio(image)
        print(image_upload)
        print(audio_upload)

        if "url" not in image_upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return render_template("post_form.html", form=form, errors=[upload])

        url = image_upload["url"]
        new_image = Post(image= url)
        db.session.add(new_image)
        db.session.commit()
        return redirect("/posts/all")

    if form.errors:
        print(form.errors)
        return render_template("post_form.html", form=form, errors=form.errors)

    return render_template("post_form.html", form=form, errors=None)
