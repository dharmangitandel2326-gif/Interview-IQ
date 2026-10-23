# Interview IQ

### Machine Learning-Based Interview Performance Prediction

## 1. Project Overview

Interview IQ is an interview preparation web application developed using React, Python Flask, SQLite, and Machine Learning.

The project includes a performance prediction module that connects a trained Machine Learning model to a web interface. It also provides interview practice tools, question management, mock interviews, bookmarks, candidate profiles, and performance analytics.

The main focus of this project is to demonstrate how Machine Learning can be integrated into a web application to predict interview performance categories.

## 2. Project Objectives

- Develop a web-based interview preparation platform.
- Integrate a trained Machine Learning model with a Flask backend.
- Provide an interface for submitting prediction inputs and viewing results.
- Connect the React frontend with backend APIs.
- Store application data using SQLite.
- Demonstrate the practical use of Machine Learning in interview preparation.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| React | Frontend development |
| JavaScript | Frontend functionality |
| Python | Backend and ML development |
| Flask | Backend API |
| SQLite | Database management |
| scikit-learn | Machine Learning |
| Joblib | Model storage and loading |
| HTML | Webpage structure |
| CSS | Styling and layout |

## 4. Machine Learning Module

The project contains the following Machine Learning files:

- `backend/train_model.py` — model training script.
- `backend/interview_performance_model.joblib` — saved model file.
- `backend/app.py` — backend application and prediction API.
- `frontend/src/components/MLPrediction.jsx` — prediction interface.

The training script prepares the model, and the saved model is used by the backend to generate predictions.

### Prediction Process

1. The user enters the information requested by the prediction interface.
2. The React frontend sends the input to the Flask backend.
3. The backend processes the input and passes it to the trained model.
4. The model generates a prediction.
5. The backend returns the result.
6. The frontend displays the prediction to the user.

The exact input features, algorithm, and prediction categories should match the implementation in `train_model.py` and `MLPrediction.jsx`.

## 5. Application Features

- User registration and login
- Dashboard
- Interview question bank
- Practice mode
- Mock interview
- Saved bookmarks
- Candidate profile
- Performance analytics
- Machine Learning-based performance prediction

## 6. Project Structure

```text
Interview_IQ/
├── backend/
│   ├── app.py
│   ├── interview_iq.db
│   ├── interview_performance_model.joblib
│   ├── requirements.txt
│   └── train_model.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Analytics.jsx
│   │   │   ├── Bookmarks.jsx
│   │   │   ├── CandidateProfile.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MLPrediction.jsx
│   │   │   ├── MockInterview.jsx
│   │   │   ├── Practice.jsx
│   │   │   ├── QuestionBank.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── questions.js
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
└── .gitignore
```

## 7. Installation and Setup

### Prerequisites

- Python 3
- Node.js and npm
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/dharmangitandel2326-gif/Interview-IQ.git
cd Interview-IQ
```

### Step 2: Start the Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

The backend runs at `http://127.0.0.1:5000` when started successfully.

### Step 3: Start the Frontend

Open a second terminal in the project directory and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

Keep both terminals running while testing the application.

## 8. Machine Learning Evaluation

The prediction module demonstrates the integration of a trained model with a web application. Its reliability depends on the training data, selected features, and model evaluation.

Actual accuracy, precision, recall, and other evaluation metrics should be reported only after measuring them on appropriate test data.

## 9. Future Enhancements

- Improve the quality and size of the training dataset.
- Evaluate and compare Machine Learning algorithms.
- Improve prediction reliability through model evaluation and tuning.
- Enhance performance analytics.
- Expand the interview question bank.
- Improve user experience and application security.

## 10. Conclusion

Interview IQ combines web development, database management, and Machine Learning in an interview preparation platform. Its prediction module demonstrates how a trained model can be connected to a React frontend through a Python Flask backend.

The project provides a foundation for exploring Machine Learning-based performance prediction and further improvements in interview preparation.

## Project Repository

**GitHub:** https://github.com/dharmangitandel2326-gif/Interview-IQ

**Project Name:** Interview IQ  
**Project Focus:** Machine Learning-Based Interview Performance Prediction  
**Frontend:** React  
**Backend:** Python Flask  
**Database:** SQLite
