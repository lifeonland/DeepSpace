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
fsServices.factory('factsSvc', function() {
  var facts = [
    '🌞 The Sun accounts for 99.86% of all mass in our solar system!',
    '🪐 Jupiter is so massive, it could fit 1,321 Earths inside it!',
    '🔴 A day on Venus is longer than its year!',
    '🌍 Earth is the only known planet with life... so far 👽',
    '💫 A billion dollars worth of gold flows into the sun every second!',
    '🌙 The Moon is moving away from Earth at 3.8 cm per year',
    '⭐ There are more stars in the universe than grains of sand on Earth!',
    '🚀 Neptune has the fastest winds in the solar system at 2,100 km/h!',
    '❄️ Uranus rotates on its side - probably from a huge collision!',
    '☄️ An asteroid wiped out 75% of all life 66 million years ago',
    '🌊 Saturn\'s rings are made mostly of water ice and rock',
    '⚡ Mercury has no atmosphere, so there\'s no wind to blow dust around',
    '👁️ If you hopped on Jupiter, you\'d weigh 2.5x more than on Earth!',
    '🔭 The nearest star to Earth (besides the Sun) is 4.24 light-years away!',
    '💥 A teaspoon of neutron star would weigh as much as Mount Everest!',
    '🌌 The Milky Way galaxy is 100,000 light-years across',
    '🪐 Venus has clouds of sulfuric acid - yikes!',
    '☀️ The Sun loses 600 million tons of mass every second due to fusion!',
    '🌑 A supermoon is 14% larger and 30% brighter than a regular moon',
    '🚀 Space is only 100 km away (the edge of atmosphere)!',
    '🔴 Mars was once a warm, wet planet with flowing water',
    '💫 A light-year is 9.46 trillion kilometers!',
    '🪐 Saturn would float in water - it\'s less dense than water!',
    '⭐ Every star you see has a much smaller apparent size than the Sun',
    '🌍 Earth\'s core is as hot as the surface of the Sun (5,200°C)',
    '🌙 The Moon\'s gravity causes Earth\'s tides',
    '👽 We\'ve only explored 5% of our own oceans!',
    '☄️ Asteroids are traveling at speeds of 20 km/s through space!',
    '🔭 The Hubble telescope can see galaxies 13.4 billion light-years away!',
    '💫 Some stars are so large, light takes 8 hours to travel across them!',
    '🌌 We live in the Orion Arm of the Milky Way galaxy',
    '🪐 Jupiter has been struck by asteroids more often than any other planet',
    '⚡ Lightning on Saturn is 1000x more powerful than on Earth!',
    '🌞 The Sun\'s core temperature is 15 million degrees Celsius!',
    '🚀 Astronauts grow 2 inches taller in space due to no gravity!',
    '🌍 Earth completes one orbit around the Sun every 365.25 days',
    '💥 Black holes can bend time itself!',
    '🔴 Olympus Mons on Mars is the largest volcano in the solar system',
    '🌙 One side of the Moon is always facing Earth',
    '⭐ The Sun is about 4.6 billion years old - middle-aged for a star!',
    '👁️ Mercury has extreme temperature swings from -180°C to 430°C!',
    '🪐 Pluto was reclassified as a "dwarf planet" in 2006 😢',
    '🌊 Neptune\'s color comes from methane in its atmosphere',
    '💫 A year on Neptune is 165 Earth years!',
    '🔭 The universe is expanding and accelerating!',
    '☄️ Meteorites can be older than Earth itself - 4.5 billion years old!',
    '🌌 Dark matter makes up 85% of the universe - but we don\'t know what it is!',
    '🚀 The International Space Station orbits Earth every 90 minutes',
    '⚡ Jupiter\'s magnetic field is 19,000 times stronger than Earth\'s!'
  ];

  return {
    getRandomFact: function() {
      return facts[Math.floor(Math.random() * facts.length)];
    },
    getFacts: function() {
      return facts;
    }
  };
});
