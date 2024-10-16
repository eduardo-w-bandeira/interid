FROM python:3.12.2-alpine

RUN pip install --upgrade pip

WORKDIR /app

# Copy the entire requirements.txt file
COPY backend/requirements.txt .

RUN pip install -r requirements.txt

# Create a temporary folder
RUN mkdir /app/databarn

# Clone the repository into the temporary folder
RUN git clone https://github.com/eduardo-w-bandeira/databarn.git /app/databarn

# Change into the databarn directory
WORKDIR /app/databarn

# Install the package using pip
RUN pip install .

# Set the entrypoint to run your Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]