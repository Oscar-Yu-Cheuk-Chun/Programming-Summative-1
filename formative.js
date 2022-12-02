//  codes for showing and hiding the graphs
/**
 * The two button elements that is used to show and hide the charts
 * @type {HTMLElement}
 * @param  {} chartBtn
 */
const chartBtn = document.getElementsByClassName('chartBtn');

// trigger events when user click the two buttons to show and hide the charts
// index 0 is the first chart which is bar chart
// index 1 is the second chart which is pie chart
chartBtn[0].addEventListener('click', function () {
  const show = document.getElementById('artist-barchart');
  //  check if the chart is currently hidden
  if (show.classList.contains('hidden')) {
    //  if chart is hidden then remove the hidden attribute to show the chart
    show.classList.remove('hidden');
  } else {
    //  if chart is not hidden then add the hidden attribute to hide the chart
    show.classList.add('hidden');
  }
});
chartBtn[1].addEventListener('click', function () {
  const show = document.getElementById('piechart');
  //  check if the chart is currently hidden
  if (show.classList.contains('hidden')) {
    //  if chart is hidden then remove the hidden attribute to show the chart
    show.classList.remove('hidden');
  } else {
    //  if chart is not hidden then add the hidden attribute to hide the chart
    show.classList.add('hidden');
  }
});

//  code for the input section
/**
 * representing user's wish input
 */
 class WishClass {
  /**
   * Create a class
   * @param {number} id - the unique timecode as id for each request submitted
   * @param {string} artistWish - the artist name that user submitted
   * @param {string} artworkWish - the artwork name that user submitted
   */
  constructor (id, artistWish, artworkWish) {
    this.id = id;
    this.artistWish = artistWish;
    this.artworkWish = artworkWish;
  };
};

/**
 * Stores the artist name that user inputs
 * @type {HTMLElement}
 * @param  {} artistWish
 */
const artistWish = document.getElementById('artistWish');

/**
 * Store the artwork name that user inputs
 * @type {HTMLElement}
 * @param  {} artworkWish
 */
const artworkWish = document.getElementById('artworkWish');

/**
 * Refers to the form element in HTML, used to reset the form after every user input
 * @type {HTMLElement}
 * @param  {} form
 */
const form = document.getElementById('form');

/**
 * array of the wishClass that store the user inputs
 * @type {Array<WishClass>}
 */
const wishlist = [];

//  DOM
document.addEventListener('DOMContentLoaded', () => {
  // trigger event when user click submit button in the input section
  document.getElementById('submit').addEventListener('click', (event) => {
    //  stop the page from refreshing every time user clicks the sumbit button
    event.preventDefault();
    //  Check if both input box are empty, if so, alerts the user to enter some values
    if (artistWish.value === '' && artworkWish.value === '') {
      window.alert('PLEASE ENTER SOMETHING!!');
    } else {
      //  push the id timecode and the user input and save into the wish object with WishClass
      const wish = new WishClass(Date.now(), artistWish.value, artworkWish.value);
      wishlist.push(wish);
      //  resets the form
      form.reset();
      //  notice the user that they have ucessfully submitted their request
      window.alert('You have sucessfully submitted your request!!');
      //  documenting the inputs in the console
      console.log(wishlist);
    };
  }
  );
});

//  JS for Bar chart
// set the dimensions and margins of the graph
const margin = { top: 20, right: 20, bottom: 160, left: 40 };
const width = 1000 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select('#artist-barchart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.json('./data/artwork_dataset1.json').then(
  /**
   * fetching the entire artwork dataset which contain information about artworks
   * @module artworkDataset
   */
  function (data) {
  /**
   * Object array of the dataset sorted by id
   * @typedef {Object} data
   * @property {number} id - Image ID, corresponding to the images in the artwork folder
   * @property {string} artist - The artist who created the artwork
   * @property {string} file_info - dimension of the art, color and file size
   * @property {link} jpg_url - the url link of the artwork image file
   * @property {string} picture_date - the date and the location which the artwork was created
   * @property {string} title - The title of the artwork
   */

  /**
   * Object array of all artist and the frequency in the dataset which is sorted in descending order of the frequency
   * @typedef {Object} artistFreq
   * @property {id} artist - name of the artist
   * @property {number} orders - the number of frequency
   */
  const artistFreq = [];
  // isolating the artist key and also counting the frequncy of each artist
  data.forEach(function (a) {
      if (!this[a.artist]) {
          this[a.artist] = {
            artist: a.artist,
            orders: 0
          };
          artistFreq.push(this[a.artist]);
      }
      this[a.artist].orders += 1;
  }, Object.create(null));
  //  Sorting the artistFreq list in descending order
  const comparator = (a, b) => {
    return b.orders - a.orders;
  };
  artistFreq.sort(comparator);
  //  Slice the top 20 results to show in the bar chart
  /**
   * Object array that sliced the top 20 results in artistFreq
   * @typedef {Object} artistData
   * @property {string} artist - name of the artist
   * @property {number} orders - the number of frequency
   */
  const artistData = artistFreq.slice(0, 20);
  // X axis
  const x = d3.scaleBand()
    .range([0, width])
    .domain(artistData.map(d => d.artist))
    .padding(0.2);
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');
  // the highest number of frequency in the dataset
  const artitstMax = Math.max(...artistFreq.map(o => o.orders));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, artitstMax])
    .range([height, 0]);
  svg.append('g')
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll('artist-bar')
    .data(artistData)
    .join('rect')
      .attr('x', d => x(d.artist))
      .attr('y', d => y(d.orders))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.orders))
      .attr('fill', 'rgb(98, 104, 109)')
      .attr('class', 'artist-bar')
      .append('title')
      .text((d) => {
          return d.orders;
        });
}
);

//  JS for Pie Chart
d3.json('./data/info_dataset.json').then(
  /**
   * fetching the entire infomation dataset which contain information about the artists
   * @function
   * @module infoDataset
  */
  function (data) {
  /**
   * Object array of the dataset sorted by id
   * @typedef {Object} data
   * @property {string} artist - The name of the artists
   * @property {string} base - The location of the artist
   * @property {sting} born_died - The year when the artist were born, died, or active
   * @property {string} nationality - The nationality of the artist
   * @property {string} period - The time period of the artist
   * @property {string} school - The artist's area of expertise
   * @property {link} url - The web address to the artist page
   */

  // set the dimensions and margins of the graph
  const width = 1000;
  const height = 600;
  const margin = 50;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  const radius = Math.min(width, height) / 2 - margin;

  // append the svg object to the div called 'my_dataviz'
  const svg = d3.select('#piechart')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'piesvg')
    .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

  // isolating the artist key and also counting the frequncy of each artist
  /**
   * Object array of all artist and the frequency in the dataset which is sorted in descending order of the frequency
   * @typedef {Object} periodFreq
   * @property {string} period - name of the art period
   * @property {number} orders - the number of frequency
   */
  let periodFreq = [];
  // isolating the period key and also counting the frequncy of each period
  data.forEach(function (a) {
      if (!this[a.period]) {
          this[a.period] = {
            period: a.period,
              orders: 0
          };
          periodFreq.push(this[a.period]);
      }
      this[a.period].orders += 1;
  }, Object.create(null));
  //  Sorting the artistFreq list in descending order
  const periodComparator = (a, b) => {
    return b.orders - a.orders;
  };
  periodFreq.sort(periodComparator);
  periodFreq = periodFreq.slice(0, 11);

  //  Mapping the period values as keys and the frequency as value in the perioddata object array
  const periodList = periodFreq.map(a => a.period);
  const periodOrders = periodFreq.map(a => a.orders);
    /**
   * Object array where period values are keys and the frequency are values
   * @typedef {Object} periodData
   * @property {string} period - name of the art period
   * @property {number} orders - the number of frequency
   */
  const periodData = Object.fromEntries(
    periodList.map((periodListvalue, index) => [periodListvalue, periodOrders[index]]));

  // set the color scale
  const color = d3.scaleOrdinal()
    .domain(periodList)
    .range(d3.schemeSet3);

  // Compute the position of each group on the pie:
  const pie = d3.pie()
    .sort(null) // Do not sort group by size
    .value(d => d[1]);
  const dataready = pie(Object.entries(periodData));

  // The arc generator
  const arc = d3.arc()
    .innerRadius(radius * 0.5) // This is the size of the donut hole
    .outerRadius(radius * 0.8);

  // Another arc that won't be drawn. Just for labels positioning
  const outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 1.15);

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('allSlices')
    .data(dataready)
    .join('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data[0]))
    .attr('stroke', 'white')
    .style('stroke-width', '2px')
    .style('opacity', 0.7);

  // Add the polylines between chart and labels:
  svg
    .selectAll('allPolylines')
    .data(dataready)
    .join('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', function (d) {
        const posA = arc.centroid(d); // line insertion in the slice
        const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        const posC = outerArc.centroid(d); // Label position = almost the same as posB
        const midangle = d.startAngle + (d.endAngle - d.startAngle - 0.5) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

  // Add the polylines between chart and labels:
  svg
    .selectAll('allLabels')
    .data(dataready)
    .join('text')
      .text(d => d.data[0] + ':' + d.data[1])
      .attr('class', 'pietext')
      .attr('transform', function (d) {
          const pos = outerArc.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          return `translate(${pos})`;
      })
      .style('text-anchor', function (d) {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return (midangle < Math.PI ? 'start' : 'end');
      });
});
