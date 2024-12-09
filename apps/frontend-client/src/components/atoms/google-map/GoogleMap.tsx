import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ChangeEvent, useState } from 'react';

const GoogleMap = () => {
    const [location, setLocation] = useState<{ lat: number, lng: number }>({ lat: 51.505, lng: -0.09 }); // Default location
    const [zoom, setZoom] = useState(13);

    const handleLinkSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = new URL((event.target as HTMLFormElement).link.value);

        // Check for the 'q' parameter in the Google Maps URL
        const query = url.searchParams.get('q');
        if (query) {
            const coordinates = query.split(',');
            const lat = parseFloat(coordinates[0]);
            const lng = parseFloat(coordinates[1]);

            if (!isNaN(lat) && !isNaN(lng)) {
                setLocation({ lat, lng });
            } else {
                alert('Invalid coordinates in the link');
            }
        } else {
            alert('Invalid Google Maps link');
        }
    };

    return (
        <div>
            <form onSubmit={handleLinkSubmit}>
                <input
                    type="text"
                    name="link"
                    placeholder="Enter link with lat & lng"
                    required
                />
                <button type="submit">Show Location</button>
            </form>

            <MapContainer center={[location.lat, location.lng]} zoom={zoom} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[location.lat, location.lng]}>
                    <Popup>Selected Location</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default GoogleMap;
