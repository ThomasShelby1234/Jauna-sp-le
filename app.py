from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Konfigurē SQLite datu bāzi
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///puzzle_game.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Datu bāzes modelis
class GameResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_name = db.Column(db.String(100), nullable=False)
    grid_size = db.Column(db.Integer, nullable=False)
    moves = db.Column(db.Integer, nullable=False)
    time_taken = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"GameResult('{self.player_name}', '{self.grid_size}', '{self.moves}', '{self.time_taken}')"

# Funkcija, lai izveidotu datu bāzi
def create_db():
    with app.app_context():
        db.create_all()

# Lapa, kas tiek atvērta sākumā
@app.route('/')
def index():
    return "Game is running!"

# Servera palaišana
if __name__ == '__main__':
    create_db()  # Izveido datu bāzi pirms servera palaišanas
    app.run(debug=True)
