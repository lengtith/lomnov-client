'use client'

import React, { ChangeEvent, useState, useEffect } from 'react';
import PostInputField from '../post-input-field/PostInputField';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Map from '@/components/molecules/map/Map';
import { extractLatLngFromUrl } from "@/libs/functions/extractLatLngFromUrl";
import { resolveShortenedUrl } from "@/libs/functions/resolveShortendURL"
// Define a custom marker icon
const customIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});
// Function to resolve shortened URLs (assumes a backend API)

export default function PostMap({ values, onChange }: { values: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function processUrl() {
      if (values) {
        setError(null); // Clear previous errors
        let urlToProcess = values;

        // Handle shortened URLs
        if (values?.includes('goo.gl') || values?.includes('maps.app.goo.gl')) {
          const resolvedUrl = await resolveShortenedUrl(values);
          if (!resolvedUrl) {
            setError('Failed to resolve shortened URL. Please provide a valid Google Maps link.');
            return;
          }
          urlToProcess = resolvedUrl;
        }

        // Extract coordinates
        const extractedPosition = extractLatLngFromUrl(urlToProcess);
        if (extractedPosition) {
          // console.log(extractedPosition);
          setPosition(extractedPosition);
        } else {
          setError('Invalid Google Maps URL. Please provide a URL with coordinates.');
        }
      }
    }
    processUrl();
  }, [values]);
  return (
    <>
      <div className="bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]">
        <div className="w-[380px] h-auto flex justify-between items-center">
          <span className="font-helvetica leading-3 tracking-widest my-3 text-[18px] font-bold text-gray-700 text-helvetica-paragraph">
            Map*
          </span>
        </div>
      </div>
      <div className="bg-white shadow-md w-full h-full rounded-b-[12px] px-[12px] py-[10px]">
        <div className="w-full h-full flex flex-1 gap-9 px-[20px]">
          <PostInputField
            onChange={onChange}
            values={values}
            name="urlmap"
            className="border border-[#D9D9D9] shadow-sm"
            placeholder="Enter Google Maps link"
          />
        </div>
        <div className="w-full h-full -mt-8 -ml-5">
          <div className="max-w-[1300px] h-[400px] mx-auto mt-[50px] px-[10px]">
            {error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : position ? (
              <MapContainer
                className="w-full h-full"
                center={position as LatLngExpression}
                zoom={20}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <Marker position={position as LatLngExpression} icon={customIcon}>
                  <Popup>
                    Selected Location <br />
                    Latitude: {position[0]} <br />
                    Longitude: {position[1]}
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="text-center text-gray-500">
                <Map property='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.960558858241!2d-73.95858052397149!3d40.76896927138521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258c003ad1b39%3A0x636a5a8ae5c286ea!2sJG%20Melon!5e1!3m2!1sen!2skh!4v1733198464249!5m2!1sen!2skh' />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
