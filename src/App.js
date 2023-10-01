import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const base_url = `https://staging.webxr.link`;
  const upload_dir = `${base_url}/wp-content/uploads/`;
  const [loading, setLoading] = useState(true);
  const [aframeData, setAframeData] = useState({});

  const getAFrameData = async () => {

    const url = `https://staging.webxr.link/wp-json/wp/v2/pages?fields=id,type,title,content,slug,excerpt,languages,post_media,featured_media,screen_images,properties_3D,featured_video,cats,tags,type&filter[orderby]=ID&order=asc&per_page=100`;

    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        // console.log("data result", result);
        let data = result.filter((item) => item.slug === "museum-of-scientists")
        setAframeData(data[0])
      })
      .catch((error) => {
        console.log("Error when getting ActiveLanguages data", error);
      });

  }

  useEffect(() => {
    getAFrameData();
    setTimeout(() => {
      console.log("aframeDataaframeData", aframeData);
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="App">
      <a-scene
        embeded
        environment="preset: forest; ground: canyon; groundTexture: checkerboard; groundColor: #445; grid: cross;"
        loading-screen="enabled: true;dotsColor: red; backgroundColor: black"
        device-orientation-permission-ui="enabled: false"
        vr-mode-ui="enabled: true"
        webxr="requiredFeatures: hit-test,local-floor;
                optionalFeatures: dom-overlay,unbounded;
                overlayElement: #overlay;"
        cursor="rayOrigin: mouse; fuse: false"
        raycaster="objects: .raycastable"
      >

        <a-entity
          id="cameraRig"
          position="25 10 0"
          rotation-reader
          thumbstick-logging
          movement-controls="constrainToNavMesh: true; speed:1; controls: checkpoint, gamepad, trackpad, keyboard, touch;"
        >
          <a-entity
            id="camera"
            camera="active: true"
            position="0 1.6 0"
            rotation="-4.469070802020421 -84.91234523838803 0"
            look-controls
            wasd-controls="acceleration:100"
            raycaster="far: 5; objects: .clickable"
          >
            <a-entity
              id="cursor"
              animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
              animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
              animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1"
              cursor="fuse: false; fuseTimeout: 500"
              position="0 0 -1"
              // geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
              material="color: black; shader: flat"
              raycaster="far: 5; objects: .clickable"
            ></a-entity>
          </a-entity>

          <a-entity id="controls">

            {/* hands control */}
            <a-entity
              id="leftHand"
              hand-controls="hand: left; handModelStyle: lowPoly; color: #ffcccc"
              raycaster="far: 5; objects: .clickable"
            // teleport-controls="cameraRig: #cameraRig; teleportOrigin: #camera;"
            />
            <a-entity
              id="rightHand"
              raycaster="far: 5; objects: .clickable"
              hand-controls="hand: right; handModelStyle: lowPoly; color: #ffcccc"
            // teleport-controls="cameraRig: #cameraRig; teleportOrigin: #camera;"
            />

            {/* leaser controls */}
            <a-entity
              id="laser-controls-left-hand"
              laser-controls="hand: left"
              raycaster="objects: .clickable"
              cursor="rayOrigin: mouse"
            />
            <a-entity
              id="laser-controls-right-hand"
              laser-controls="hand: right"
              raycaster="objects: .clickable"
              cursor="rayOrigin: mouse"
            />

            {/* Gear VR Controls */}
            <a-entity
              id="gearvr-controls-left-hand"
              gearvr-controls="hand: left"
            />
            <a-entity
              id="gearvr-controls-left-hand"
              gearvr-controls="hand: right"
            />

            {/* Magic-leap Controls */}
            <a-entity
              id="magicleap-controls-left-hand"
              magicleap-controls="hand: left"
            />
            <a-entity
              id="magicleap-controls-right-hand"
              magicleap-controls="hand: right"
            />

            {/* Oculus go Controls */}
            <a-entity
              id="oculus-go-controls-left-hand"
              oculus-go-controls="hand: left"
            />
            <a-entity
              id="oculus-go-controls-right-hand"
              oculus-go-controls="hand: right"
            />

            {/* Oculus touch Controls */}
            <a-entity
              id="oculus-touch-controls-left-hand"
              oculus-touch-controls="hand: left"
            />
            <a-entity
              id="oculus-touch-controls-right-hand"
              oculus-touch-controls="hand: right"
            />

            {/* HTC Vive controllers/wands */}
            <a-entity id="vive-controls-left-hand" vive-controls="hand: left" />
            <a-entity
              id="vive-controls-right-hand"
              vive-controls="hand: right"
            />

            {/* HTC Vive focus controllers/wands */}
            <a-entity
              id="vive-focus-controls-left-hand"
              vive-focus-controls="hand: left"
            />
            <a-entity
              id="vive-focus-controls-right-hand"
              vive-focus-controls="hand: right"
            />

            {/* Windows-Motion-controls */}
            <a-entity
              id="windows-motion-controls-left-hand"
              windows-motion-controls="hand: left"
            />
            <a-entity
              id="windows-motion-controls-right-hand"
              windows-motion-controls="hand: right"
            />

          </a-entity>

        </a-entity>

        <a-assets timeout="5000">
          {/* <a-asset-item
              id="skybox"
              src={upload_dir + aframeData?.properties_3D?.skybox?.src}
              crossOrigin="anonymous"
            ></a-asset-item> */}

          <a-asset-item
            id="world_model"
            src={upload_dir + aframeData?.properties_3D?.world_model?.src}
            crossOrigin="anonymous"
          ></a-asset-item>
          <a-asset-item
            id="nav_mesh"
            src={upload_dir + aframeData?.properties_3D?.nav_mesh?.src}
            crossOrigin="anonymous"
          ></a-asset-item>
          {aframeData?.properties_3D?.furniture?.map((furniture) => {
            return (
              <a-asset-item
                key={furniture?.id}
                id={furniture?.id}
                src={base_url + furniture?.full_path}
                crossOrigin="anonymous"
              ></a-asset-item>
            );
          })}

          {aframeData?.post_media?.screen_image?.map((scientist) => {
            return (
              <img
                key={scientist?.id}
                id={scientist?.id}
                src={base_url + scientist?.full_path}
                alt={scientist?.alt}
                crossOrigin="anonymous"
              ></img>
            );
          })}
        </a-assets>



      </a-scene>
    </div>
  );
}

export default App;
