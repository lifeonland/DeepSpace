/**
 * ------------------------------------------ START OF LICENSE -----------------------------------------
 *
 * Deep-Space
 *
 * Copyright (c) Microsoft Corporation
 *
 * All rights reserved.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the ""Software""), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * ----------------------------------------------- END OF LICENSE ------------------------------------------
 */
fsServices.service('imagesSvc', function() {
  var planetData = [
    { 
      name: 'Earth', 
      src: 'https://images-assets.nasa.gov/image/as8-14-2383/as8-14-2383~large.jpg', 
      width: 120, 
      height: 120, 
      description: '🌍 Our Blue Planet', 
      diameter: '12,742 km' 
    },
    { 
      name: 'Jupiter', 
      src: 'https://images-assets.nasa.gov/image/iss064e11574/iss064e11574~large.jpg', 
      width: 140, 
      height: 140, 
      description: '🪐 The Gas Giant', 
      diameter: '139,820 km' 
    },
    { 
      name: 'Mars', 
      src: 'https://images-assets.nasa.gov/image/PIA24546/PIA24546~large.jpg', 
      width: 100, 
      height: 100, 
      description: '🔴 The Red Planet', 
      diameter: '6,779 km' 
    },
    { 
      name: 'Saturn', 
      src: 'https://images-assets.nasa.gov/image/PIA21436/PIA21436~large.jpg', 
      width: 130, 
      height: 130, 
      description: '💫 Ringed Beauty', 
      diameter: '116,460 km' 
    },
    { 
      name: 'Venus', 
      src: 'https://images-assets.nasa.gov/image/PIA23791/PIA23791~large.jpg', 
      width: 110, 
      height: 110, 
      description: '🌟 The Morning Star', 
      diameter: '12,104 km' 
    },
    { 
      name: 'Mercury', 
      src: 'https://images-assets.nasa.gov/image/PIA15533/PIA15533~large.jpg', 
      width: 95, 
      height: 95, 
      description: '⚡ Closest to Sun', 
      diameter: '4,879 km' 
    },
    { 
      name: 'Neptune', 
      src: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~large.jpg', 
      width: 120, 
      height: 120, 
      description: '🌊 Ice Giant', 
      diameter: '49,244 km' 
    },
    { 
      name: 'Uranus', 
      src: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~large.jpg', 
      width: 110, 
      height: 110, 
      description: '❄️ Tilted World', 
      diameter: '50,724 km' 
    },
    { 
      name: 'Sun', 
      src: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000393~large.jpg', 
      width: 150, 
      height: 150, 
      description: '☀️ Our Star', 
      diameter: '1,391,000 km' 
    },
    { 
      name: 'Moon', 
      src: 'https://images-assets.nasa.gov/image/as11-44-6551/as11-44-6551~large.jpg', 
      width: 90, 
      height: 90, 
      description: '🌙 Earth\'s Satellite', 
      diameter: '3,474 km' 
    },
    { 
      name: 'Pluto', 
      src: 'https://images-assets.nasa.gov/image/PIA19947/PIA19947~large.jpg', 
      width: 85, 
      height: 85, 
      description: '❌ Dwarf Planet', 
      diameter: '2,377 km' 
    },
    { 
      name: 'Mimas', 
      src: 'https://images-assets.nasa.gov/image/PIA18317/PIA18317~large.jpg', 
      width: 80, 
      height: 80, 
      description: '🎯 Death Star Moon', 
      diameter: '396 km' 
    }
  ];

  this.getImages = function() {
    return planetData;
  }
});



