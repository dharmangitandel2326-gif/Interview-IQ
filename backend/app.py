
import os
import sqlite3
import math
import joblib

from pathlib import Path
from functools import wraps

from flask import Flask, request, jsonify, g
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "interview_iq.db")

# Load the trained machine learning model.
MODEL_PATH = Path(BASE_DIR) / "interview_performance_model.joblib"

try:
    model = joblib.load(MODEL_PATH) if MODEL_PATH.exists() else None
except Exception as error:
    print(f"Could not load ML model: {error}")
    model = None


def connect_db():
    db = sqlite3.connect(DB_PATH)
    db.row_factory = sqlite3.Row
    return db


def init_db():
    with connect_db() as db:
        db.executescript("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                phone TEXT DEFAULT '',
                education TEXT DEFAULT '',
                experience TEXT DEFAULT '',
                target_role TEXT DEFAULT '',
                skills TEXT DEFAULT '',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS bookmarks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                question_id TEXT NOT NULL,
                UNIQUE(user_id, question_id),
                FOREIGN KEY(user_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                score REAL NOT NULL,
                total INTEGER NOT NULL,
                mode TEXT DEFAULT 'Mock Interview',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS progress (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                question_id TEXT NOT NULL,
                completed INTEGER DEFAULT 1,
                UNIQUE(user_id, question_id),
                FOREIGN KEY(user_id) REFERENCES users(id)
            );
        """)


def current_user():
    user_id = request.headers.get("X-User-ID")

    if not user_id or not user_id.isdigit():
        return None

    with connect_db() as db:
        return db.execute(
            "SELECT * FROM users WHERE id = ?",
            (int(user_id),)
        ).fetchone()


def login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        user = current_user()

        if user is None:
            return jsonify({"error": "Please sign in first."}), 401

        g.user = user
        return fn(*args, **kwargs)

    return wrapper


def public_user(user):
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "phone": user["phone"],
        "education": user["education"],
        "experience": user["experience"],
        "target_role": user["target_role"],
        "skills": user["skills"],
    }


# -------------------- HOMEPAGE --------------------

@app.get("/")
def home():
    return jsonify({
        "message": "Welcome to Interview IQ Backend",
        "status": "ok",
        "health_check": "/api/health"
    })


# -------------------- HEALTH CHECK --------------------

@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "ml_model_loaded": model is not None
    })


# -------------------- REGISTER --------------------

@app.post("/api/register")
def register():
    data = request.get_json(silent=True) or {}

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or not email or not password:
        return jsonify({
            "error": "Name, email and password are required."
        }), 400

    if len(password) < 8:
        return jsonify({
            "error": "Password must be at least 8 characters."
        }), 400

    try:
        with connect_db() as db:
            cursor = db.execute(
                """
                INSERT INTO users (name, email, password_hash)
                VALUES (?, ?, ?)
                """,
                (name, email, generate_password_hash(password))
            )

            user = db.execute(
                "SELECT * FROM users WHERE id = ?",
                (cursor.lastrowid,)
            ).fetchone()

        return jsonify({"user": public_user(user)}), 201

    except sqlite3.IntegrityError:
        return jsonify({
            "error": "That email is already registered."
        }), 409


# -------------------- LOGIN --------------------

@app.post("/api/login")
def login():
    data = request.get_json(silent=True) or {}

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    with connect_db() as db:
        user = db.execute(
            "SELECT * FROM users WHERE email = ?",
            (email,)
        ).fetchone()

    if user is None or not check_password_hash(
        user["password_hash"], password
    ):
        return jsonify({
            "error": "Invalid email or password."
        }), 401

    return jsonify({"user": public_user(user)})


# -------------------- PROFILE --------------------

@app.get("/api/profile")
@login_required
def get_profile():
    return jsonify({"user": public_user(g.user)})


@app.put("/api/profile")
@login_required
def update_profile():
    data = request.get_json(silent=True) or {}

    allowed = [
        "name", "phone", "education",
        "experience", "target_role", "skills"
    ]

    values = {
        key: str(data.get(key, g.user[key]) or "").strip()
        for key in allowed
    }

    if not values["name"]:
        return jsonify({"error": "Name is required."}), 400

    with connect_db() as db:
        db.execute(
            """
            UPDATE users
            SET name = ?, phone = ?, education = ?,
                experience = ?, target_role = ?, skills = ?
            WHERE id = ?
            """,
            (
                values["name"],
                values["phone"],
                values["education"],
                values["experience"],
                values["target_role"],
                values["skills"],
                g.user["id"]
            )
        )

        user = db.execute(
            "SELECT * FROM users WHERE id = ?",
            (g.user["id"],)
        ).fetchone()

    return jsonify({"user": public_user(user)})


# -------------------- BOOKMARKS --------------------

@app.get("/api/bookmarks")
@login_required
def get_bookmarks():
    with connect_db() as db:
        rows = db.execute(
            "SELECT question_id FROM bookmarks WHERE user_id = ?",
            (g.user["id"],)
        ).fetchall()

    return jsonify({
        "bookmarks": [row["question_id"] for row in rows]
    })


@app.post("/api/bookmarks")
@login_required
def add_bookmark():
    data = request.get_json(silent=True) or {}
    question_id = str(data.get("question_id", "")).strip()

    if not question_id:
        return jsonify({
            "error": "question_id is required."
        }), 400

    with connect_db() as db:
        db.execute(
            """
            INSERT OR IGNORE INTO bookmarks (user_id, question_id)
            VALUES (?, ?)
            """,
            (g.user["id"], question_id)
        )

    return jsonify({"success": True})


@app.delete("/api/bookmarks/<path:question_id>")
@login_required
def remove_bookmark(question_id):
    with connect_db() as db:
        db.execute(
            """
            DELETE FROM bookmarks
            WHERE user_id = ? AND question_id = ?
            """,
            (g.user["id"], question_id)
        )

    return jsonify({"success": True})


# -------------------- PRACTICE PROGRESS --------------------

@app.post("/api/progress")
@login_required
def save_progress():
    data = request.get_json(silent=True) or {}
    question_id = str(data.get("question_id", "")).strip()

    if not question_id:
        return jsonify({
            "error": "question_id is required."
        }), 400

    with connect_db() as db:
        db.execute(
            """
            INSERT INTO progress (user_id, question_id, completed)
            VALUES (?, ?, 1)
            ON CONFLICT(user_id, question_id)
            DO UPDATE SET completed = 1
            """,
            (g.user["id"], question_id)
        )

    return jsonify({"success": True})


# -------------------- ANALYTICS --------------------

@app.get("/api/analytics")
@login_required
def analytics():
    user_id = g.user["id"]

    with connect_db() as db:
        completed = db.execute(
            """
            SELECT COUNT(*) AS count FROM progress
            WHERE user_id = ? AND completed = 1
            """,
            (user_id,)
        ).fetchone()["count"]

        bookmarked = db.execute(
            """
            SELECT COUNT(*) AS count FROM bookmarks
            WHERE user_id = ?
            """,
            (user_id,)
        ).fetchone()["count"]

        results = db.execute(
            """
            SELECT id, score, total, mode, created_at
            FROM results
            WHERE user_id = ?
            ORDER BY id DESC LIMIT 20
            """,
            (user_id,)
        ).fetchall()

    return jsonify({
        "completed": completed,
        "bookmarked": bookmarked,
        "results": [dict(row) for row in results]
    })


# -------------------- SAVE MOCK RESULTS --------------------

@app.post("/api/results")
@login_required
def save_result():
    data = request.get_json(silent=True) or {}

    try:
        score = float(data.get("score", 0))
        total = int(data.get("total", 0))
    except (TypeError, ValueError, OverflowError):
        return jsonify({
            "error": "Score and total must be numbers."
        }), 400

    if (
        not math.isfinite(score)
        or total < 1
        or not 0 <= score <= total
    ):
        return jsonify({
            "error": "Invalid score or total."
        }), 400

    mode = str(data.get("mode", "Mock Interview"))[:80]

    with connect_db() as db:
        cursor = db.execute(
            """
            INSERT INTO results (user_id, score, total, mode)
            VALUES (?, ?, ?, ?)
            """,
            (g.user["id"], score, total, mode)
        )

    return jsonify({
        "success": True,
        "id": cursor.lastrowid
    }), 201


# -------------------- MACHINE LEARNING PREDICTION --------------------

@app.post("/api/predict-performance")
def predict_performance():
    if model is None:
        return jsonify({
            "error": (
                "ML model not found. Run "
                "python3 train_model.py from the backend folder."
            )
        }), 500

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "error": "Send a JSON object containing the three input values."
        }), 400

    try:
        practice_score = float(data["practice_score"])
        completed_questions = int(data["completed_questions"])
        mock_score = float(data["mock_score"])

        if not all(map(math.isfinite, [
            practice_score, mock_score
        ])):
            raise ValueError("Scores must be finite numbers.")

        if not 0 <= practice_score <= 100:
            raise ValueError("practice_score must be between 0 and 100.")

        if not 0 <= mock_score <= 100:
            raise ValueError("mock_score must be between 0 and 100.")

        if not 0 <= completed_questions <= 10000:
            raise ValueError(
                "completed_questions must be between 0 and 10000."
            )

    except (KeyError, TypeError, ValueError, OverflowError) as error:
        return jsonify({
            "error": str(error) or (
                "Provide valid practice_score, completed_questions, "
                "and mock_score values."
            )
        }), 400

    try:
        features = [[
            practice_score,
            completed_questions,
            mock_score
        ]]

        prediction = model.predict(features)[0]

        probabilities = {}
        if hasattr(model, "predict_proba"):
            classifier = model.named_steps.get(
                "classifier", model
            )
            class_names = classifier.classes_
            scores = model.predict_proba(features)[0]
            probabilities = {
                str(label): round(float(probability) * 100, 2)
                for label, probability in zip(class_names, scores)
            }

        return jsonify({
            "prediction": str(prediction),
            "probabilities": probabilities,
            "inputs": {
                "practice_score": practice_score,
                "completed_questions": completed_questions,
                "mock_score": mock_score
            },
            "note": (
                "Demonstration prediction based on illustrative "
                "sample training data; not validated for real outcomes."
            )
        })

    except Exception:
        app.logger.exception("ML prediction failed")
        return jsonify({
            "error": "Prediction failed. Check that the trained model is valid."
        }), 500


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
