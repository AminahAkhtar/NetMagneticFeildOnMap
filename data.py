import pandas as pd

# Read specific columns from the CSV file into a DataFrame
data = pd.read_csv('magnetometerdata.csv', usecols=['Latitude', 'Longitude', 'NetField'])

# Convert 'net magnetic field' column to numeric
data['NetField'] = pd.to_numeric(data['NetField'], errors='coerce')

# Group the data by latitude and longitude, and find the minimum and maximum values of net magnetic field
grouped_data = data.groupby(['Latitude', 'Longitude'])['NetField'].agg(['min', 'max']).reset_index()


# Rename the columns
grouped_data.rename(columns={'min': 'Min Net Field', 'max': 'Max Net Field'}, inplace=True)

# Save the grouped data to a new CSV file
grouped_data.to_csv('output_file.csv', index=False)
