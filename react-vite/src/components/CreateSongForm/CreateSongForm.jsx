function CreateSongForm() {
  return (
    <div className="create-song-main-cont block">
      <h2>Hello</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Submit</button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  );
}

export default CreateSongForm;
