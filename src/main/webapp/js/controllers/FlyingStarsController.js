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
flyingStarsApp.controller('FlyingStarsController',
    function FlyingStarsContoller($scope, imagesSvc, factsSvc, $interval) {
        'use strict';

        console.log('🪐 FlyingStarsController Started');
        console.log('Images Service:', imagesSvc);
        console.log('Facts Service:', factsSvc);

        $scope.settings = {
          speed: 60,
          numOfStars: 200,
          images: imagesSvc.getImages()
        }

        console.log('📊 Settings:', $scope.settings);

        // Initialize with a random fact
        $scope.currentFact = factsSvc.getRandomFact();
        console.log('📝 Initial Fact:', $scope.currentFact);

        // Rotate facts every 6 seconds
        $interval(function() {
          $scope.currentFact = factsSvc.getRandomFact();
          console.log('📝 New Fact:', $scope.currentFact);
        }, 6000);
    }
);



