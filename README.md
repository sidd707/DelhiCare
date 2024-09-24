# Hospital Management System

## Overview

This project aims to develop a comprehensive Hospital Management System (HMS) to address operational challenges in hospitals, such as patient queuing in OPDs, bed availability, and patient admissions. The system also includes modules for managing the dispensation of medicines and consumables, along with inventory management features. Designed for integration with a city-wide module, this solution provides a seamless healthcare experience across the city. Additionally, two chatbots are included to enhance user interaction and provide better service.

## Features

### 1. Queuing Models in OPDs
- *Automated Patient Queuing:* Efficient management of patient queues in Outpatient Departments (OPDs) using advanced queuing algorithms.
- *Real-time Updates:* Display of current queue status and estimated waiting times for patients.
- *Priority Handling:* Support for priority-based queuing for emergency or special cases.

### 2. Bed Availability and Patient Admission
- *Real-time Bed Management:* Tracking of bed occupancy and availability across different wards and departments.
- *Automated Patient Admission:* Streamlined patient admission process based on bed availability and patient needs.
- *Discharge and Transfer Management:* Easy handling of patient discharge and inter-ward transfers.

### 3. Inventory Management
- *Medicine and Consumable Tracking:* Real-time tracking of medicines and consumables across the hospital.
- *Automated Replenishment:* Alerts and automatic reorder functionality when stock levels fall below defined thresholds.
- *Expiry Date Monitoring:* Tracking of expiry dates of medicines and consumables to minimize wastage.

### 4. Chatbots
- *Medicine Information Chatbot:*
  - Provides detailed information about various medicines, including dosage, side effects, and usage instructions.
  - Helps users identify the availability of specific medicines within the hospital.
  - https://llmchatbot-dtlt9bfmcqup4kqek6yzfo.streamlit.app/
  
- *Symptom Checker Chatbot:*
  - Allows users to input their symptoms and receive information about possible diseases.
  - Provides guidance on whether a visit to the hospital is necessary and directs patients to appropriate departments.
  - https://llmchatbot2-a6x3gzlytjvvaoheyizu6r.streamlit.app/
- * LLM colab file:*
  - https://colab.research.google.com/drive/1lQUt5CwWSWLEPhVTPhbWFJIhlsZlqmAK?usp=sharing

## Technical Specifications

- *Backend:* Node.js/Java for server-side logic and APIs.
- *Frontend:* React.js/Angular for user interface development.
- *Database:* MySQL/PostgreSQL for relational data management.
- *Chatbot Development:* Python using NLP libraries such as NLTK/Spacy.
- *Integration:* RESTful APIs for integration with city-wide healthcare systems.

## Installation and Setup

1. *Clone the Repository:*
   ```bash
   git clone https://github.com/CodeNinjaSarthak/DelhiCare.git
   cd DelhiCare
