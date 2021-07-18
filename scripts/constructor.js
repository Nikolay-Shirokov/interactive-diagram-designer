const pointsBox = document.querySelector(".schema__points");
const objectsBox = document.querySelector(".schema__objects");
const svg = document.querySelector(".schema__area");
const drowButton = document.querySelector(".toolbar__button_tool_drow");
const cancelButton = document.querySelector(".toolbar__button_tool_cancel");

function renderPointProperties(point) {
  pointHTML =
    `<li class="schema__point">
      <label class="schema__coordinate-caption" for="point-${pointsBox.childNodes.length}-x">x:</label>
      <input class="schema__coordinate-input" type="number" name="point-${pointsBox.childNodes.length}-x" id="point-${pointsBox.childNodes.length}-x" value=${point.x}>
      <label class="schema__coordinate-caption" for="point-${pointsBox.childNodes.length}-y">y:</label>
      <input class="schema__coordinate-input" type="number" name="point-${pointsBox.childNodes.length}-y" id="point-${pointsBox.childNodes.length}-y" value=${point.y}>
    </li>`;
  pointsBox.insertAdjacentHTML("beforeend", pointHTML);
};

function renderPoint(point) {

  let pointSVG = `<circle class="schema__svg-point" cx="${point.x}" cy="${point.y}" r="2" fill="#000"/>`;
  svg.insertAdjacentHTML("beforeend", pointSVG);

  let textSVG = `<text class="schema__svg-point-counter" x="${point.x}" y="${point.y}">${pointsBox.childNodes.length}</text>`;
  svg.insertAdjacentHTML("beforeend", textSVG);

};

function renderPolygon(points) {

  let pointsText = "";

  for (let point of points) {
    pointsText += " " + point.x + "," + point.y;
  };

  let poligonSVG = `<polygon class="schema__polygon" points="${pointsText}"/>`;
  svg.insertAdjacentHTML("beforeend", poligonSVG);

};

function renderObject() {
  let objectHTML = `<li class="schema__object">${objectsBox.childNodes.length + 1}</li>`;
  objectsBox.insertAdjacentHTML("beforeend", objectHTML);
}

function getPoints() {

  let points = [];

  const inputs = document.querySelectorAll('.schema__coordinate-input');

  for (let i = 0; i < inputs.length; i++) {

    let input = inputs[i];

    let constituents = input.id.split('-');
    let counter = constituents[1];
    let axisID = constituents[2];

    if (points.length <= counter) {

      point = {
        x: 0,
        y: 0
      };

      points.push(point);

    }

    points[counter][axisID] = input.value;

  };

  return points;

};

function clearPoints() {

  let elems = svg.childNodes;

  for (let i = elems.length - 1; i >= 0; i--) {
    let element = elems[i];
    if (element.tagName !== 'polygon') {
      svg.removeChild(element);
    };
  };

  pointsBox.innerHTML = "";

};

function highlightDrowButton(set) {
  if (set === true) {
    drowButton.classList.add('toolbar__button_highlight');
  } else if (drowButton.classList.contains('toolbar__button_highlight')) {
    drowButton.classList.remove('toolbar__button_highlight');
  }
};

function onDrowButtonClick(event) {

  let points = getPoints();

  if (points.length === 0) {
    return;
  }

  clearPoints();
  renderPolygon(points);
  renderObject();
  highlightDrowButton(false);

}

function onCancelButtonClick(event) {
  /* svg.innerHTML = "";
  pointsBox.innerHTML = "";
  objectsBox.innerHTML= ""; */
  clearPoints();
  highlightDrowButton(false);
}

function onSVGAreaClick(event) {

  let svgBox = event.currentTarget.getBoundingClientRect();
  let point = {
    x: Math.floor(event.clientX - svgBox.left),
    y: Math.floor(event.clientY - svgBox.top)
  };

  renderPointProperties(point);
  renderPoint(point);

  highlightDrowButton(true);

}

svg.addEventListener("click", onSVGAreaClick);
drowButton.addEventListener("click", onDrowButtonClick);
cancelButton.addEventListener("click", onCancelButtonClick);

pointsBox.innerHTML = "";
objectsBox.innerHTML = "";

/* svg
  .addEventListener("click", function (event) {
    if (event.target.classList.contains('polygon')) {
      event.target.classList.toggle('polygon_engaged');
      console.dir(event.target.points);
    }
  }); */
