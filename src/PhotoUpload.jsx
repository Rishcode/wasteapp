import React from 'react';
import { Button } from 'react-bootstrap';
import PhotoEntry from './PhotoEntry';

function PhotoUpload({ photos, setPhotos }) {
  const addPhotoEntry = () => {
    setPhotos(prev => [...prev, { file: null, description: '' }]);
  };

  return (
    <div>
      {photos.map((photo, index) => (
        <PhotoEntry key={index} index={index} photo={photo} setPhotos={setPhotos} />
      ))}
      <Button onClick={addPhotoEntry} className="w-100 mb-3" variant="secondary">
        Add Photo
      </Button>
    </div>
  );
}

export default PhotoUpload;