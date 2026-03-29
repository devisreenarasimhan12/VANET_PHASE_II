<img width="309" height="350" alt="Screenshot 2026-01-05 004050" src="https://github.com/user-attachments/assets/fe3e36dc-2416-4553-a018-97d7b84876cb" />Rescue Mesh Simulation System
Project Overview

This project implements a simulation-based Rescue Mesh framework integrating SUMO (Simulation of Urban Mobility), a Python-based control layer, and a web interface using React and a backend server. The system demonstrates decentralized vehicular communication and data visualization.

Tech Stack
SUMO (Simulation of Urban Mobility)
Python (TraCI, SUMO control scripts)
React.js (Frontend)
Backend (Flask or Node.js/Express)
Project Structure
RescueMesh/
│── sumo/
│   ├── config.sumocfg
│   ├── network.net.xml
│   └── routes.rou.xml
│
│── backend/
│   ├── app.py / server.js
│   └── requirements.txt / package.json
│
│── frontend/
│   ├── src/
│   └── package.json
│
│── scripts/
│   └── run_simulation.py
│
└── README.md

Prerequisites

Ensure the following are installed:

SUMO (including sumo and sumo-gui)
Python 3.x
Node.js and npm
pip (and optionally virtualenv)
Running SUMO Simulation with Python
Step 1: Set Environment Variables

On Linux/macOS:

export SUMO_HOME=/path/to/sumo
export PATH=$SUMO_HOME/bin:$PATH

On Windows (Command Prompt):

set SUMO_HOME=C:\path\to\sumo
set PATH=%SUMO_HOME%\bin;%PATH%
Step 2: Install Python Dependencies
pip install traci sumolib
Step 3: Run the Simulation
python scripts/run_simulation.py
Simulation Output

<img width="1462" height="856" alt="Screenshot 2026-01-18 160240" src="https://github.com/user-attachments/assets/849c6fb1-cc97-409b-be55-250f75b6a403" />
<img width="537" height="355" alt="Screenshot 2026-01-18 160449" src="https://github.com/user-attachments/assets/d142c700-f711-41be-bb72-d240acc63304" />

<img width="309" height="350" alt="Screenshot 2026-01-05 004050" src="https://github.com/user-attachments/assets/0ad2bebe-6b4d-415c-b7ce-b727a274418d" />

<img width="866" height="357" alt="Screenshot 2026-01-05 001100" src="https://github.com/user-attachments/assets/c18991d9-60fe-4bbf-9f47-b7e375914eb6" />


Running Backend Server
Option 1: Flask (Python Backend)
cd backend
pip install -r requirements.txt
python app.py
Option 2: Node.js (Express Backend)
cd backend
npm install
node server.js

The backend server will typically run on:

http://localhost:5000
Running React Frontend
cd frontend
npm install
npm start

The frontend application will run on:

http://localhost:3000
Frontend Output

<img width="1827" height="901" alt="Screenshot 2026-03-22 155641" src="https://github.com/user-attachments/assets/3378d887-1ed3-4e10-b387-84b517c45c8e" />

<img width="1840" height="897" alt="Screenshot 2026-03-22 155559" src="https://github.com/user-attachments/assets/0decb1e3-3324-4b3d-8ee4-a7745790bed3" />

The front-end is also hosted on: https://rescue-mesh-display-main.vercel.app/

System Workflow
SUMO simulates vehicular movement.
Python (TraCI) interacts with the simulation and extracts data.
The backend processes and exposes APIs.
The React frontend consumes APIs and visualizes the data.
Features
Vehicle movement simulation
Data extraction using TraCI
Backend API integration
Real-time or near real-time visualization
Modular architecture for extensions
Customization
Modify simulation parameters in routes.rou.xml and network.net.xml
Extend logic in run_simulation.py
Add new API endpoints in the backend
Enhance UI components in the React frontend
Troubleshooting
Verify that SUMO_HOME is correctly set
Ensure required ports (3000, 5000) are available
Use sumo-gui for debugging simulation behavior
Check dependency installation if scripts fail
Future Work
Real-time updates using WebSockets
Integration with mapping services
AI-based prediction modules
Containerization using Docker
