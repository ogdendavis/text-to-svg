const stringToSVG = (str, pxSize=.5, width=100, lineHeight=12) => {
  /* Basic function to convert a string to an SVG. No line breaks or options (yet)
   * Parameters:
   * str (string, required): String to conver to svg
   * pxSize (integer): 'Pixel' size, in rem
   * width (integer): Number of pixels in svg, horizontally
   * lineHeight (integer): Number of pixels per line, vertically. Represents space for characters, and space between current line and next line
   */

  const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

  // Tracks x and y values as letters are converted to polygons
  let [col, row] = [0, 0];

  // Keeps track of longest printed line, for sizing purposes
  let longestRow = 0;

  // Maps for irregular letter sizes (regular is 4px wide by 5px tall)
  // Values are [width, height] in px
  const irregLtr = {
    '.': [2,3],
    '-': [3,1],
    '@': [5,7],
    'i': [3,5],
    'm': [5,5],
    'v': [3,5],
  }

  // Use above to arrange and fill in the characters!
  str.toLowerCase().split('').forEach(char => {
    const poly = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
    // Track x and y position while drawing letter
    let x, y;
    // Get letter width and height, for spacing
    const [lw,lh] = char in irregLtr ? irregLtr[char] : [4,5];

    // Find x starting position
    x = col;
    // If printing farther than the longest line so far, remember it!
    if (x+lw > longestRow) {
      longestRow = x+lw;
    }
    // If the letter will go off the end of the line, go to the next line!
    if (x+lw > width) {
      x = 0;
      col = 0;
      row += lineHeight;
    }
    // Find y starting position -- offset is hard-coded to align letters & punctuation to baseline
    const yOff = lh === 7 ? 0 : lh === 5 ? 1 : lh === 1 ? 3 : 4;
    y = row + yOff;

    // Set the points for the svg
    const points = getLetterPoints(char,x,y);
    if (points) {
      poly.setAttribute('points', points);
    }
    else {
      console.error(`I don't know "${char}"`);
    }

    // Append the finished polygon
    svg.appendChild(poly);

    //Advance to the starting point for the next letter
    col += lw + 1;
  });

  // After all polygons have been added, set svg attributes and style
  svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
  svg.setAttribute('shape-rendering','crispEdges');
  svg.setAttribute('viewBox',`0 0 ${Math.min(longestRow, width)} ${row + 7}`);
  svg.setAttribute('width', `${Math.min(longestRow, width) * pxSize}rem`);
  svg.setAttribute('height', `${(row + 7) * pxSize}rem`);

  return svg;
}

const getLetterPoints = (l,x,y) => {
  const lookup = {
    '.': `${x},${y} ${x+2},${y} ${x+2},${y+2} ${x},${y+2}`,
    '-': `${x},${y} ${x+3},${y} ${x+3},${y+1} ${x},${y+1}`,
    '@': `${x+4},${y+4} ${x+4},${y+3} ${x+3},${y+3} ${x+3},${y+4} ${x+5},${y+4} ${x+5},${y+5} ${x+2},${y+5} ${x+2},${y+2} ${x+4},${y+2} ${x+4},${y+4} ${x+5},${y+4} ${x+5},${y+1} ${x+4},${y+1} ${x+4},${y} ${x+1},${y} ${x+1},${y+7} ${x+5},${y+7} ${x+5},${y+6} ${x},${y+6} ${x},${y+1} ${x+4},${y+1}`,
    '0': `${x},${y} ${x+4},${y} ${x+4},${y+1} ${x},${y+1} ${x},${y+5} ${x+1},${y+5} ${x+1},${y+1} ${x+4},${y+1} ${x+4},${y+5} ${x+1},${y+5} ${x+1},${y+4} ${x+3},${y+4} ${x+3},${y+1} ${x},${y+1}`,
    '2': `${x},${y} ${x+4},${y} ${x+4},${y+3} ${x+1},${y+3} ${x+1},${y+4} ${x+4},${y+4} ${x+4},${y+5} ${x},${y+5} ${x},${y+2} ${x+3},${y+2} ${x+3},${y+1} ${x},${y+1}`,
    '6': `${x+1},${y+3} ${x+1},${y+2} ${x+4},${y+2} ${x+4},${y+5} ${x},${y+5} ${x},${y} ${x+3},${y} ${x+3},${y+1} ${x+1},${y+1} ${x+1},${y+4} ${x+3},${y+4} ${x+3},${y+3}`,
    '7': `${x},${y} ${x+4},${y} ${x+4},${y+2} ${x+2},${y+2} ${x+2},${y+5} ${x+1},${y+5} ${x+1},${y+3} ${x+3},${y+3} ${x+3},${y+1} ${x},${y+1}`,
    '8': `${x},${y} ${x+4},${y} ${x+4},${y+1} ${x},${y+1} ${x},${y+5} ${x+4},${y+5} ${x+4},${y+4} ${x+1},${y+4} ${x+1},${y+1} ${x+3},${y+1} ${x+3},${y+2} ${x+1},${y+2} ${x+1},${y+3} ${x+3},${y+3} ${x+3},${y+5} ${x+4},${y+5} ${x+4},${y} ${x},${y} ${x},${y} ${x},${y+1} ${x+4},${y+1} ${x+4},${y}`,
    '9': `${x+3},${y+2} ${x+3},${y+3} ${x},${y+3} ${x},${y} ${x+4},${y} ${x+4},${y+5} ${x+3},${y+5} ${x+3},${y+1} ${x+1},${y+1} ${x+1},${y+2}`,
    'a': `${x},${y+1} ${x},${y+5} ${x+1},${y+5} ${x+1},${y+3} ${x+3},${y+3} ${x+3},${y+5} ${x+4},${y+5} ${x+4},${y+1} ${x+3},${y+1} ${x+3},${y+2} ${x+1},${y+2} ${x+1},${y} ${x+3},${y} ${x+3},${y+1}`,
    'c': `${x+1},${y} ${x+4},${y} ${x+4},${y+1} ${x},${y+1} ${x},${y+4} ${x+4},${y+4} ${x+4},${y+5}  ${x+1},${y+5}`,
    'd': `${x},${y} ${x+3},${y} ${x+3},${y+4} ${x+4},${y+4} ${x+4},${y+1} ${x},${y+1} ${x},${y+5} ${x+3},${y+5} ${x+3},${y+4} ${x+1},${y+4} ${x+1},${y+1} ${x},${y+1}`,
    'e': `${x+4},${y+1} ${x+4},${y} ${x},${y} ${x},${y+5} ${x+4},${y+5} ${x+4},${y+4} ${x+1},${y+4} ${x+1},${y+3} ${x+3},${y+3} ${x+3},${y+2} ${x+1},${y+2} ${x+1},${y+1}`,
    'g': `${x+3},${y} ${x+3},${y+1} ${x},${y+1} ${x},${y+1} ${x},${y+4} ${x+4},${y+4} ${x+4},${y+2} ${x+2},${y+2} ${x+2},${y+3} ${x+3},${y+3} ${x+3},${y+5} ${x+1},${y+5} ${x+1},${y}`,
    'i': `${x},${y} ${x+3},${y} ${x+3},${y+1} ${x+2},${y+1} ${x+2},${y+4} ${x+3},${y+4} ${x+3},${y+5} ${x},${y+5} ${x},${y+4} ${x+1},${y+4} ${x+1},${y+1} ${x},${y+1}`,
    'l': `${x},${y} ${x+1},${y} ${x+1},${y+4} ${x+4},${y+4} ${x+4},${y+5} ${x},${y+5}`,
    'm': `${x+1},${y} ${x},${y} ${x},${y+5} ${x+1},${y+5} ${x+1},${y+2} ${x+4},${y+2} ${x+4},${y+5} ${x+5},${y+5} ${x+5},${y} ${x+4},${y} ${x+4},${y+1} ${x+3},${y+1} ${x+3},${y+3} ${x+2},${y+3} ${x+2},${y+1} ${x+1},${y+1}`,
    'n': `${x},${y} ${x},${y+5} ${x+1},${y+5} ${x+1},${y+2} ${x+3},${y+2} ${x+3},${y} ${x+4},${y} ${x+4},${y+5} ${x+3},${y+5} ${x+3},${y+3} ${x+2},${y+3} ${x+2},${y+1} ${x+1},${y+1} ${x+1},${y}`,
    'o': `${x+1},${y+1} ${x+1},${y} ${x+3},${y} ${x+3},${y+1} ${x},${y+1} ${x},${y+4} ${x+1},${y+4} ${x+1},${y+1} ${x+1},${y+4} ${x+3},${y+4} ${x+3},${y+5} ${x+1},${y+5} ${x+1},${y+4} ${x+4},${y+4} ${x+4},${y+1} ${x+3},${y+1} ${x+3},${y+4} ${x+1},${y+4}`,
    's': `${x+1},${y} ${x+4},${y} ${x+4},${y+1} ${x},${y+1} ${x},${y+2} ${x+3},${y+2} ${x+3},${y+5} ${x},${y+5} ${x},${y+4} ${x+4},${y+4} ${x+4},${y+3} ${x+1},${y+3}`,
    'u': `${x},${y} ${x+1},${y} ${x+1},${y+5} ${x+3},${y+5} ${x+3},${y} ${x+4},${y} ${x+4},${y+4} ${x},${y+4}`,
    'v': `${x},${y} ${x+1},${y} ${x+1},${y+5} ${x+2},${y+5} ${x+2},${y} ${x+3},${y} ${x+3},${y+4} ${x},${y+4}`,
  }
  return l in lookup ? lookup[l] : false;
}

const formatTextForDisplay = (t) => {
  return t.replace('>','>\n').replace(/<\/polygon>/g, '</polygon>\n').replace(/<p/g,'\xa0\xa0\xa0\xa0<p');
}

window.onload = () => {
  // Get inputs
  const textInput = document.querySelector('#text-input');

  // Get targets
  const svgTarget = document.querySelector('.svg-target');
  const textTarget = document.querySelector('.text-target');

  // Set up starter values
  const starterSVG = stringToSVG('Hello, World!')
  svgTarget.appendChild(starterSVG);
  textTarget.innerText = formatTextForDisplay(starterSVG.parentNode.innerHTML);

  textInput.addEventListener('input', (e) => {
    svgTarget.firstElementChild.replaceWith(stringToSVG(e.target.value));
    textTarget.innerText = formatTextForDisplay(svgTarget.innerHTML);
  });
}
