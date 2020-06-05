import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

import { Map, TileLayer, GeoJSON } from 'react-leaflet-universal';


const Mapita  = ({ geojson }) => {  
  const position = [-33.437233382, -70.650763988];
  return (
    <Map center={position} zoom={14} zoomOffset={-1} style={{ height: "500px", width: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geojson}></GeoJSON>
    </Map>
  );
}

const Home = ({ geojson }) => {
  return <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" />
    </Head>
    <main>
      <Mapita geojson={geojson} />
    </main>
  </div>;
};

export async function getStaticProps() {
  const res = await fetch('https://cswcl.github.io/fake-api/db.json');
  const geojson = await res.json()
  return {
    props: {
      geojson,
    },
  }
};


export default Home;
