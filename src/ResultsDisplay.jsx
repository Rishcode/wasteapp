import React from 'react';
import { Card } from 'react-bootstrap';

function ResultsDisplay({ results }) {
  return (
    <div>
      {results.location && (
        <p className="text-center">
          <strong>Location:</strong> {results.location.lat}, {results.location.lon}
        </p>
      )}
      {results.results.map((result, index) => (
        <Card key={index} className="result-card">
          <Card.Body>
            <Card.Title>{result.description || 'No description'}</Card.Title>
            <img
              src={`data:image/jpeg;base64,${result.annotated_image}`}
              alt="Processed image"
              className="img-fluid"
            />
            <ul>
              {result.detections.map((det, detIndex) => (
                <li key={detIndex}>
                  {det.class}: {det.count} ({det.percentage.toFixed(2)}%)
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ResultsDisplay;