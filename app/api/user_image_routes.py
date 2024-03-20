from flask import Blueprint, request,abort
from app.models import db, UserImage
from flask_login import current_user, login_required
from app.forms import UserImageForm
from app.api.aws_helpers import (upload_file_to_s3_images, upload_file_to_s3_audio, get_unique_filename, remove_file_from_s3_images, remove_file_from_s3)

user_image_routes = Blueprint('user', __name__)

#Get image

# POST USER IMAGE
@user_image_routes('/<int:id>/new', methods=['POST'])
@login_required
def create_image():
    form = UserImageForm()
    form['csrf_toker'].data = request.cookies['csrf_token']
    if not current_user:
        return {"message":  "Current user not logged in"}

    if form.validate_on_submit():

        profile_image = form.data["profile_image"]
        image_name = form.data['profile_image']
        profile_image.filename = get_unique_filename(profile_image.filename)
        profile_image_upload = upload_file_to_s3_images(profile_image)

        if "url" not in profile_image_upload:
            return {"message":profile_image_upload["errors"],"Object":"image_upload"}

        new_profile_image = UserImage(
            user_id = current_user.id,
            image_file = profile_image_upload["url"],
            image_file_name = image_name
        )
        db.session.add(new_profile_image)
        db.session.commit()

        return {"profile_image":new_profile_image.to_dict()},201
    else:
        return {"errors": form.errors}, 400


# EDIT USER IMAGE
# @user_image_routes('/<int:id>/edit', methods=['POST'])
# @login_required
# def create_image():
#     form = UserImageForm()
#     form['csrf_toker'].data = request.cookies['csrf_token']
#     if not current_user:
#         return {"message":  "Current user not logged in"}

#     if form.validate_on_submit():

#         profile_image = form.data["profile_image"]
#         image_name = form.data['profile_image']
#         profile_image.filename = get_unique_filename(profile_image.filename)
#         profile_image_upload = upload_file_to_s3_images(profile_image)

#         if "url" not in profile_image_upload:
#             return {"message":profile_image_upload["errors"],"Object":"image_upload"}

#         new_profile_image = UserImage(
#             user_id = current_user.id,
#             image_file = profile_image_upload["url"],
#             image_file_name = image_name
#         )
#         db.session.add(new_profile_image)
#         db.session.commit()

#         return {"profile_image":new_profile_image.to_dict()},201
#     else:
#         return {"errors": form.errors}, 400
