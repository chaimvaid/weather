# weather_job/Dockerfile

FROM python:3.10-slim

# Install necessary packages, including cron
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    cron \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt



# Add the cron job to fetch data every minute
RUN echo "* * * * * cd /app && /usr/local/bin/python main.py >> /var/log/cron.log 2>&1" > /etc/cron.d/weather-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/weather-cron

# Apply the cron job
RUN crontab /etc/cron.d/weather-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Start the cron service and log the cron job output
CMD ["sh", "-c", "cron && tail -f /var/log/cron.log"]
