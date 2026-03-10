# Use official Tomcat 9 with JDK 17 base image
FROM tomcat:9.0.73-jdk17

# Set environment variables for Tomcat (optional but good practice)
ENV CATALINA_HOME=/usr/local/tomcat
ENV PATH=$CATALINA_HOME/bin:$PATH

# Remove default webapps to keep image clean
RUN rm -rf $CATALINA_HOME/webapps/*

# Create ROOT folder
RUN mkdir $CATALINA_HOME/webapps/ROOT

# Copy your WAR file to temporary location
COPY target/DeepSpace.war /tmp/DeepSpace.war

# Install unzip, extract WAR into ROOT, clean up
RUN apt-get update && apt-get install -y unzip \
    && unzip /tmp/DeepSpace.war -d $CATALINA_HOME/webapps/ROOT \
    && rm /tmp/DeepSpace.war \
    && apt-get remove -y unzip \
    && apt-get autoremove -y

# Expose default Tomcat port
EXPOSE 8080

# Optional: run Tomcat as a non-root user (more secure)
USER 1000

# Start Tomcat
CMD ["catalina.sh", "run"]