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
package com.microsoft.tfs.demo;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.ArrayList;

@Path("/images")
public class ImageService {

    private final static List<Image> planetaries;

    static {
        planetaries = new ArrayList<Image>(); 

        //http://www.solarsystemscope.com/nexus/resources/planet_images/
        //Content distributed under CC Attribution license
        //http://creativecommons.org/licenses/by/3.0/
        
        Image mercury = new Image();
        mercury.setSrc("./images/Mercury.jpg");
        mercury.setWidth(660);
        mercury.setHeight(660);
        planetaries.add(mercury);
        
        Image venus = new Image();
        venus.setSrc("./images/Venus.jpg");
        venus.setWidth(660);
        venus.setHeight(660);
        planetaries.add(venus);
        
        Image mars = new Image();
        mars.setSrc("./images/Mars.jpg");
        mars.setWidth(660);
        mars.setHeight(660);
        planetaries.add(mars);
        
        Image moon = new Image();
        moon.setSrc("./images/Moon.jpg");
        moon.setWidth(660);
        moon.setHeight(660);
        planetaries.add(moon);
        
        Image uranus = new Image();
        uranus.setSrc("./images/Uranus.jpg");
        uranus.setWidth(660);
        uranus.setHeight(660);
        planetaries.add(uranus);
        
        Image neptune = new Image();
        neptune.setSrc("./images/Neptune.jpg");
        neptune.setWidth(660);
        neptune.setHeight(660);
        planetaries.add(neptune);
        
        Image pluto = new Image();
        pluto.setSrc("./images/Pluto.jpg");
        pluto.setWidth(660);
        pluto.setHeight(660);
        planetaries.add(pluto);
        
        Image sun = new Image();
        sun.setSrc("./images/sun.png");
        sun.setWidth(660);
        sun.setHeight(660);
        planetaries.add(sun);

        // Uncomment the following section of code so Earth appears
        // and remember to update the unit tests in "ImageServiceTest.java"
        
        Image earth = new Image();
        earth.setSrc("./images/earth.png");
        earth.setWidth(512);
        earth.setHeight(512);
        planetaries.add(earth);
        

        Image jupiter = new Image();
        jupiter.setSrc("./images/jupiter.png");
        jupiter.setWidth(512);
        jupiter.setHeight(512);
        planetaries.add(jupiter);

        Image saturn = new Image();
        saturn.setSrc("./images/saturn.png");
        saturn.setWidth(1206);
        saturn.setHeight(690);
        planetaries.add(saturn);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Image> getImages() {
        return planetaries;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{name}")
    public Image getByName(@PathParam("name") final String name) {
        final String imageSrc = String.format("/%s.png", name.toLowerCase());
        for (Image i : planetaries) {
            if (i.getSrc().endsWith(imageSrc)) {
                return i;
            }
        }

        return null;
    }
}
