
import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# Sample training data for demonstration.
# Replace with real, consented candidate data for meaningful predictions.
data = pd.DataFrame({
    "practice_score": [
        15, 25, 30, 35, 40, 45, 50, 55, 60, 65,
        70, 75, 80, 85, 90, 95, 20, 38, 58, 78,
        28, 48, 68, 88, 33, 53, 73, 93, 42, 82
    ],
    "completed_questions": [
        1, 2, 3, 4, 5, 5, 6, 7, 8, 8,
        9, 10, 11, 12, 13, 14, 2, 4, 7, 11,
        3, 6, 9, 13, 4, 7, 10, 14, 5, 12
    ],
    "mock_score": [
        12, 20, 28, 30, 38, 42, 48, 52, 58, 62,
        68, 72, 78, 82, 88, 93, 18, 34, 56, 76,
        25, 45, 65, 86, 31, 50, 70, 91, 40, 80
    ],
    "level": [
        "Needs Practice", "Needs Practice", "Needs Practice",
        "Needs Practice", "Needs Practice", "Needs Practice",
        "Developing", "Developing", "Developing", "Developing",
        "Developing", "Developing", "Strong", "Strong", "Strong",
        "Strong", "Needs Practice", "Needs Practice", "Developing",
        "Strong", "Needs Practice", "Developing", "Developing",
        "Strong", "Needs Practice", "Developing", "Developing",
        "Strong", "Developing", "Strong"
    ]
})

X = data[["practice_score", "completed_questions", "mock_score"]]
y = data["level"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

model = Pipeline([
    ("scaler", StandardScaler()),
    ("classifier", RandomForestClassifier(
        n_estimators=100,
        random_state=42,
        class_weight="balanced"
    ))
])

model.fit(X_train, y_train)

predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

joblib.dump(model, "interview_performance_model.joblib")

print("Model training completed!")
print(f"Test accuracy on sample data: {accuracy:.2%}")
print("Saved model: interview_performance_model.joblib")
print("Note: Sample-data accuracy does not establish real-world performance.")
