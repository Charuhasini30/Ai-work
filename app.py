from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the model
with open("disease_model.pkl", "rb") as file:
    model = pickle.load(file)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    symptoms = data.get("symptoms")
    
    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    # Process symptoms into a format the model understands
    # Example: Convert symptoms to a feature vector (assumes preprocessing logic exists)
    try:
        # Replace this with actual preprocessing
        feature_vector = preprocess_symptoms(symptoms)  
        prediction = model.predict([feature_vector])
        return jsonify({"prediction": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def preprocess_symptoms(symptoms):
    # Add logic to convert symptoms to the appropriate feature vector for the model
    return [0, 1, 0]  # Example vector, replace with real preprocessing

if __name__ == "__main__":
    app.run(debug=True)
