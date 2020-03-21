const stringToSVG = (str, pxSize=.5, width=100, lineHeight=12) => {
  /* Basic function to convert a string to an SVG. No line breaks or options (yet)
   * Parameters:
   * str (string, required): String to conver to svg
   * pxSize (integer): 'Pixel' size, in rem
   * width (integer): Number of pixels in svg, horizontally
   * lineHeight (integer): Number of pixels per line, vertically. Represents space for characters, and space between current line and next line
   */

  // Tracks x and y values as letters are converted to polygons
  let [col, row] = [0, 0];

  // Keeps track of longest printed line, for sizing purposes
  let longestRow = 0;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

  str.toLowerCase().split('').forEach(char => {
    const poly = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
    let x, y;
    switch(char) {
      case 'l':
        // Find x starting position
        x = col;
        // If printing farther than the longest line so far, remember it!
        if (x+4 > longestRow) {
          longestRow = x+4;
        }
        // If the letter will go off the end of the line, go to the next line!
        if (x+4 > width) {
          x = 0;
          col = 0;
          row += lineHeight;
        }
        // Find y starting position
        y = row + 1;
        // Set the points for the svg
        poly.setAttribute('points', getLetterPoints('l',x,y));
        //Advance to the starting point for the next letter
        col += 5;
        break;
      default:
        console.error(`stringToSVG doesn't know "${char}"`);
    }
    svg.appendChild(poly);
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
  switch(l) {
    case 'l':
      return `${x},${y} ${x+1},${y} ${x+1},${y+4} ${x+4},${y+4} ${x+4},${y+5} ${x},${y+5}`;
    default:
      console.error(`getLetterPoints doesn't know "${l}"`);
      return;
  }
}

document.querySelector('.target').appendChild(stringToSVG('lUCas@ogdendavis.com'))
