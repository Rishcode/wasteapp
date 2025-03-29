import React, { useState } from 'react';
import { Container, Button, Spinner, Alert, Card } from 'react-bootstrap';
import PhotoUpload from './PhotoUpload';
import LocationCapture from './LocationCapture';
import ResultsDisplay from './ResultsDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        error => {
          setError('Error getting location: ' + error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const submitPhotos = () => {
    const validPhotos = photos.filter(photo => photo.file);
    if (validPhotos.length === 0) {
      setError('Please upload at least one photo.');
      return;
    }
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    if (location) {
      formData.append('location', JSON.stringify(location));
    }
    validPhotos.forEach((photo, index) => {
      formData.append('photos[]', photo.file);
      formData.append('descriptions[]', photo.description || '');
    });

    fetch('http://localhost:5000/process', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Error processing photos. Please try again.');
        setIsLoading(false);
      });
  };

  return (
    <Container className="app-container">
      <h1 className="text-center my-4">Waste Detection App</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <PhotoUpload photos={photos} setPhotos={setPhotos} />
          <LocationCapture onGetLocation={getLocation} location={location} />
          <Button
            onClick={submitPhotos}
            disabled={isLoading}
            className="w-100 mt-3"
            variant="primary"
          >
            {isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" className="mr-2" />
                Processing...
              </>
            ) : (
              'Process Photos'
            )}
          </Button>
        </Card.Body>
      </Card>
      {results && <ResultsDisplay results={results} />}
    </Container>
  );
}

export default App;