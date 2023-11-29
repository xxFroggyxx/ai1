const getLocationButton = document.querySelector('#getLocation');
const saveButton = document.querySelector('#saveButton');
const rasterMap = document.querySelector('#rasterMap');
const piecesElement = document.querySelector('#pieces');

const shuffleArray = (array) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => obj.value);

const validatePuzzles = (numberOfPieces) => {
  const pieces = document.querySelectorAll('#rasterMap .drag-target canvas');
  let validCount = 0;

  for (let piece of pieces) {
    const id = piece.id;
    const [_, pieceRow, pieceCol] = id.split('_');
    const target = document.querySelector(`#rasterMap .piece_${pieceRow}_${pieceCol}`);

    if (piece.parentElement === target) {
      validCount++;
    }
  }

  return validCount === numberOfPieces;
};

var map = L.map('map').setView([53.44810710753359, 14.492032678525668], 16);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution:
    'Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
}).addTo(map);

saveButton.addEventListener('click', () => {
  Notification.requestPermission();
  leafletImage(map, (err, canvas) => {
    pieces = [];
    const { offsetWidth: WIDTH, offsetHeight: HEIGHT } = document.querySelector('#map');

    rasterMap.width = WIDTH;
    rasterMap.height = HEIGHT;

    const numRows = 4;
    const numCols = 4;
    const totalPieces = numRows * numCols;
    const pieceWidth = WIDTH / numCols;
    const pieceHeight = HEIGHT / numRows;

    piecesElement.style.gridTemplateColumns = `repeat(${totalPieces}, 1fr)`;

    const createDiv = (...str) => {
      const div = document.createElement('div');
      div.classList = `drag-target ${str}`;
      return div;
    };

    piecesElement.innerHTML = '';
    rasterMap.innerHTML = '';
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        piecesElement.appendChild(createDiv());
        rasterMap.appendChild(createDiv(`piece_${row}_${col}`));
      }
    }

    const createDraggableCanvas = (id, width, height) => {
      const canvas = document.createElement('canvas');
      canvas.id = id;
      canvas.width = width;
      canvas.height = height;
      canvas.setAttribute('draggable', 'true');
      canvas.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
      });
      return canvas;
    };

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const pieceCanvas = createDraggableCanvas(`piece_${row}_${col}`, pieceWidth, pieceHeight);
        const pieceContext = pieceCanvas.getContext('2d');
        pieceContext.drawImage(
          canvas,
          col * pieceWidth,
          row * pieceHeight,
          pieceWidth,
          pieceHeight,
          0,
          0,
          pieceWidth,
          pieceHeight
        );

        pieces.push(pieceCanvas);
      }
    }

    const initialPieceCount = document.querySelectorAll('#pieces .drag-target').length;
    let targets = document.querySelectorAll('.drag-target');
    for (let target of targets) {
      target.addEventListener('dragenter', (e) => {
        e.target.style.outline = '3px solid #1eff00';
      });
      target.addEventListener('dragleave', (e) => {
        e.target.style.outline = 'none';
      });
      target.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      target.addEventListener(
        'drop',
        (e) => {
          let myElement = document.getElementById(e.dataTransfer.getData('text'));
          e.target.style.outline = 'none';
          if (e.target.classList.contains('drag-target') && !e.target.hasChildNodes()) {
            e.target.appendChild(myElement);
          }
        },
        false
      );
      target.addEventListener('dragend', (e) => {
        if (validatePuzzles(initialPieceCount)) {
          console.log('Puzzle solved.');
          let permission = Notification.permission;
          if (permission === 'granted') {
            new Notification('You won!');
          }
        }
      });
    }

    pieces = shuffleArray(pieces);
    let getPuzzles = piecesElement.querySelectorAll('.drag-target');
    for (let index = 0; index < pieces.length; index++) {
      getPuzzles[index].style.width = `${pieceWidth}px`;
      getPuzzles[index].style.height = `${pieceHeight}px`;
      getPuzzles[index].appendChild(pieces[index]);
    }
  });
});

getLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Sorry, no geolocation available for you!');
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`Twoje współrzędne: ${latitude}, ${longitude}`);

      map.setView([latitude, longitude]);
    },
    (positionError) => {
      console.error(positionError);
    },
    {
      enableHighAccuracy: false,
    }
  );
});
