import React from 'react';
import { Form } from 'react-bootstrap';

function PhotoEntry({ index, photo, setPhotos }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotos(prev => {
      const newPhotos = [...prev];
      newPhotos[index] = { ...newPhotos[index], file };
      return newPhotos;
    });
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    setPhotos(prev => {
      const newPhotos = [...prev];
      newPhotos[index] = { ...newPhotos[index], description };
      return newPhotos;
    });
  };

  return (
    <div className="mb-3">
      <Form.Control
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="mb-2"
      />
      <Form.Control
        type="text"
        placeholder="Description"
        value={photo.description || ''}
        onChange={handleDescriptionChange}
      />
    </div>
  );
}

export default PhotoEntry;