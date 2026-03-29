# Rescue Mesh Simulation System

## Project Overview

This project implements a simulation-based Rescue Mesh framework integrating SUMO (Simulation of Urban Mobility), a Python-based control layer, and a web interface using React and a backend server. The system demonstrates decentralized vehicular communication and data visualization.

---

## Tech Stack

- SUMO (Simulation of Urban Mobility)
- Python (TraCI, SUMO control scripts)
- React.js (Frontend)
- Backend (Flask or Node.js/Express)

---

## Project Structure

```
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
```

---

## Prerequisites

- SUMO (including sumo and sumo-gui)
- Python 3.x
- Node.js and npm
- pip (optional: virtualenv)

---

## Running SUMO Simulation with Python

### Step 1: Set Environment Variables

Linux/macOS:
```
export SUMO_HOME=/path/to/sumo
export PATH=$SUMO_HOME/bin:$PATH
```

Windows:
```
set SUMO_HOME=C:\path\to\sumo
set PATH=%SUMO_HOME%\bin;%PATH%
```

### Step 2: Install Dependencies

```
pip install traci sumolib
```

### Step 3: Run Simulation

```
python scripts/run_simulation.py
```

---

## Simulation Output

![Simulation](https://github.com/user-attachments/assets/849c6fb1-cc97-409b-be55-250f75b6a403)
![Simulation](https://github.com/user-attachments/assets/d142c700-f711-41be-bb72-d240acc63304)
![Simulation](https://github.com/user-attachments/assets/0ad2bebe-6b4d-415c-b7ce-b727a274418d)
![Simulation](https://github.com/user-attachments/assets/c18991d9-60fe-4bbf-9f47-b7e375914eb6)

---

## Running Backend

Flask:
```
cd backend
pip install -r requirements.txt
python app.py
```

Node:
```
cd backend
npm install
node server.js
```

Backend runs on http://localhost:5000

---

## Running Frontend

```
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000

---

## Frontend Output

![Frontend](https://github.com/user-attachments/assets/3378d887-1ed3-4e10-b387-84b517c45c8e)
![Frontend](https://github.com/user-attachments/assets/0decb1e3-3324-4b3d-8ee4-a7745790bed3)

---

## Live Demo

https://rescue-mesh-display-main.vercel.app/

---

## Workflow

1. SUMO simulates vehicles  
2. Python extracts data  
3. Backend exposes APIs  
4. React visualizes  

---

## Features

- Vehicle simulation  
- TraCI data extraction  
- API integration  
- Real-time visualization  

---

## Troubleshooting

- Check SUMO_HOME  
- Ensure ports are free  
- Use sumo-gui for debugging  

---

## Future Work

- WebSockets  
- Map integration  
- AI modules  
- Docker  

---

## Authors
Devisree N, Thanushika K, Santhanalakshme N S

